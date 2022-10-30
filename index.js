const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());


// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ohx16.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const productCollection = client.db("dashboard").collection("product");
        const userCollection = client.db("dashboard").collection("user");
        app.get('/all_product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const result = await cursor.toArray()
            res.send(result);
        })
        app.get('/all_user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray()
            res.send(result);
        })

        
        
        // POST
        app.post('/add_product' , async(req,res) => {
            const product = req.body;
            const addProduct = await productCollection.insertOne(product);
            res.send(addProduct);
        })
        // POST
        app.post('/add_user' , async(req,res) => {
            const user = req.body;
            const addUser = await userCollection.insertOne(user);
            res.send(addUser);
        })


        app.put('/update_product/:id', async (req, res) => {
            const id = req.params.id;
            const updateQuantity = req.body;
            const query = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateBookInfo = {
                $set: {
                    quantity: updateQuantity.quantity
                }
            };
            const book = await booksCollection.updateOne(query, updateBookInfo, options);
            res.send(book);
        });


        // DELETE
        app.delete('/product_delete/:id' , async(req,res)=> {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })
        
        // DELETE
        app.delete('/user_delete/:id' , async(req,res)=> {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        
    }
    finally{

    }
}
run().catch(console.dir);



// end_point
app.get('/',(req,res) => {
    res.send('dashboard server');
})

app.listen(port , ()=>{
    console.log('app port is',port);
})