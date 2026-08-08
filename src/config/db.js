//import library
const mongoose=require("mongoose");

//import dotenv
require('dotenv').config();

//get username and password from .env file
username=process.env.Db_uname;
password=process.env.Db_password;

//connect to the database
config={
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}

mongoose.connect(`mongodb+srv://${username}:${password}@rspcluster.hqkr1yq.mongodb.net/MyCollectibles?appName=rspcluster`, config);

//log connection status
mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error',(err)=>{
    console.log(`Error connecting to MongoDB: ${err}`);
});

module.exports=mongoose;