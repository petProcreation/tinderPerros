const { Schema, model } = require('mongoose');

// Create a new schema
const userSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
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
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet',
    }]
},
 { timestamps: true});


const User = model('User', userSchema);


module.exports = User;