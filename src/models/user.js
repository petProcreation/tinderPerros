const { Schema, model } = require('mongoose');

// Create a new schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {	
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive'],
    },
},
 { timestamps: true});


const User = model('User', userSchema);


module.exports = User;