//User model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
});




module.exports = mongoose.model('User', userSchema);


//replace user with the name of the model you want to create. 
// For example, if you want to create a model for a collection called "products", you would replace "User" with "Product" in the last line.
//replace userSchema, 'User' and userScehma