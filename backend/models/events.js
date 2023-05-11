const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: false
    },
    added_date: {
        type: Date,
        required: false
    },
    host: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true,
    },
    participants: {
        type: Number,
        required: true
    }
});

const Events = mongoose.model('Events', EventSchema);
module.exports = Events;