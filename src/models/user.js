import { Schema, model } from 'mongoose';


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
    picture:{
        type: Image,
        required: false
    }

});


const User = model('User', userSchema);

export default User;
