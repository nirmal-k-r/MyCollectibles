//import library
const mongoose=require("mongoose");

//import dotenv
require('dotenv').config();

//get username and password from .env file
const username = process.env.Db_uname;
const password = process.env.Db_password;

//connect to the database
const config = {
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}

const mongoUri = `mongodb+srv://${username}:${password}@rspcluster.hqkr1yq.mongodb.net/MyCollectibles?appName=rspcluster`;

mongoose.connect(mongoUri, config).catch(() => {
    // The connection event handler below logs the error. Catching here keeps
    // a failed initial connection from becoming an unhandled rejection.
});

//log connection status
mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error',(err)=>{
    console.log(`Error connecting to MongoDB: ${err}`);
});

module.exports=mongoose;
