const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./Config/Dbconnection');
const app = express();


connectDb();
const port =process.env.PORT || 3002;
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(bodyParser.json()) 

app.use('/',require("./Routes/Route"))

app.listen(port,()=>{
    console.log(`server is running ${port}`) 
})



