const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
});

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;