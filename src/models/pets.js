const { Schema, model } = require('mongoose');

// Create a new schema
const petSchema = new Schema({
    id:{
        type: Number
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    race: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive'],
    },
    profilePic: {
        type: String,
    },
    description: {
        type: String,
    }
},
 { timestamps: true});


const Pet = model('Pet', petSchema);


module.exports = Pet;
