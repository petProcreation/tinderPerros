const { Schema, model } = require('mongoose');

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
        unique: true
    },
    password: {
        type: String,
        required: true
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
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;