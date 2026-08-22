//User model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    token: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    role:{ 
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//validation for email field 
userSchema.path('email').validate((email) => email.includes('@'), 'Invalid email format');

function logUserCreation(doc) {
    console.log(`New user created: ${doc}`);
}

//on create
userSchema.post('save', logUserCreation);

module.exports = mongoose.model('User', userSchema);


