const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    id: {
        type: Number,
        required: true
    },
    fraternity: {
        type: Object,
        default: {
            status: false,
            time: null
        }
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;