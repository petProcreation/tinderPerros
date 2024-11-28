const {Schema, model} = require('mongoose');

const matchSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    pet1: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    pet2: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    }
},
{timestamps: true}
);


const Match = model('Match', matchSchema);
module.exports = Match;