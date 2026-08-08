//import library

const mongoose=require("mongoose");

//get username and password from .env file
username=process.env.Db_uname;
password=process.env.Db_password;


//connect to the database
config={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(`mongodb+srv://${username}:${password}@rspcluster.hqkr1yq.mongodb.net/MyCollectibles?appName=rspcluster`, config, (err)=>{
    if(err){
        console.log("Error in connecting to database", err);
    }else{
        console.log("Connected to database");
    }
});


module.exports=mongoose;