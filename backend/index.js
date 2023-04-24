const figlet = require('figlet');

console.log(figlet.textSync('Pledge'));
console.log('  Pledge Backend v1 : By T-bone\n');

console.log('[init] Starting up, loading modules...');

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const config = require('./config');

const Session = require('./models/session');
const User = require('./models/user');

console.log('[init] Creating app...');
const app = express();

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('[init] Connected to Mongo.'))
    .catch(console.error);

const sessionCache = {};

(async () => {
    console.log('[cache] Loading sessions into cache...');

    const dbSessions = await Session.find({});
    for (session of dbSessions) {
        sessionCache[session.token] = session.user;
    }

    console.log('[cache] Found and cached ' + dbSessions.length + ' sessions.');
})();

// Define global UUID cache
global.uuidCache = {};

app.use(cors());
app.use(express.json({limit: "50mb"}));

// Authentication middleware
app.use((req, res, next) => {
    if (req.body.token) {
        // Validate token
        let cachedSession = sessionCache[req.body.token];

        if (cachedSession) {
            req.isAuthenticated = true;
            User.findOne({ id: cachedSession }).then(user => {
                req.user = user;
                req.isAdmin = user.admin;
                req.hasArtemis = user.plan !== 'none'; // todo: expiry check

                next();
            });

            return;
        } else {
            req.isAuthenticated = false;
            req.hasArtemis = false;
            req.isAdmin = false;
            req.user = null;
        }
    } else {
        req.isAuthenticated = false;
        req.hasArtemis = false;
        req.isAdmin = false;
        req.user = null;
    }

    next();
});

/**
 * Sign in route
 * 
 * @returns success, token, profile
 * @param { email, password }
 * @method POST
 */
app.post('/session/sign_in', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing required fields.' });

    let u = await User.findOne({ email });
    if (!u) return res.status(400).json({ success: false, message: 'No account exists with that email.' });

    let match = await bcrypt.compare(password, u.password);
    if (match) {
        const sessionId = await require('./internals/random').get(128);
        sessionCache[sessionId] = u.id;

        const newSess = new Session({
            token: sessionId,
            user: u.id
        });

        await newSess.save();

        await res.json({ success: true, token: sessionId, profile: u });
    } else return res.status(400).json({ success: false, message: 'Password does not match.' });
});

/**
 * Gets a user profile from a token.
 * 
 * @returns user
 * @param { token }
 * @method POST
 */
app.post('/session/me', async (req, res) => {
    let { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: 'No token provided.' });

    let cachedId = sessionCache[token];

    if (cachedId) {
        let u = await User.findOne({ id: cachedId });
        if (!u) return res.status(500).json({ success: false, message: 'No fucking clue how you\'ve done this mate.' });

        // Return the user profile
        return res.json({ success: true, profile: u });
    } else return res.status(400).json({ success: false, message: 'Invalid token, it might have expired.' });
});

/**
 * Deletes a session.
 * 
 * @returns success
 * @param { token }
 * @method POST
 */
app.post('/session/delete', async (req, res) => {
    let { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: 'No token provided.' });

    let cachedId = sessionCache[token];

    if (cachedId) {
        let u = await User.findOne({ _id: cachedId });
        if (!u) return res.status(500).json({ success: false, message: 'No fucking clue how you\'ve done this mate.' });

        delete sessionCache[token];

        await Session.deleteOne({ token });

        // Return the user profile
        return res.json({ success: true, message: 'Deleted session' });
    } else return res.status(400).json({ success: false, message: 'Invalid token, it might have expired.' });
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/events', require('./routes/api/events'));

app.listen(80, () => {
    console.log('[init] Started Pledge backend. JavaScript supremacy');
});