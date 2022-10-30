const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// end_point
app.get('/',(req,res) => {
    res.send('dashboard server');
})

app.listen(port , ()=>{
    console.log('app port is',port);
})