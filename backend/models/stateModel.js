const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'State name is mandatory'],
        unique: true,
        trim: true,
    },
    image:{
        type: String,
        required: [true, 'State image is mandatory'],
    },
    haveTour:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const State = mongoose.model('State', stateSchema);

module.exports = State;