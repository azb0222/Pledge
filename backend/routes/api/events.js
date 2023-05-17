const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const Events = require('../../models/events');
const e = require('express');
const moment = require('moment-timezone');


router.get('/list', async (req, res) => {
    // Simple auth check
    //if (!req.isAuthenticated || !req.hasArtemis) 
    //    return res.status(401).json({ success: false, message: 'You are not authenticated.' });
    const d = moment.tz(new Date().toISOString(), "America/New_York").add('-4', 'hours').toDate();
    console.log(d);
    let events = (await Events.find({end_date: {$gte: d}})).map(ev => {
        return ev;
    });
    res.json({
        success: true,
        events: events
    });
});

router.post('/:id/attend', async (req, res) => {
    // Simple auth check
    //if (!req.isAuthenticated || !req.hasArtemis) 
    //    return res.status(401).json({ success: false, message: 'You are not authenticated.' });
    await Events.findOneAndUpdate( {_id: req.params.id}, 
        {$inc : {'participants' : 1}}, 
        {new: true})
        .then(function(ress) { 
            if (ress === null) {
                res.json({
                    success: false
                });
            } else {
                res.json({
                    success: true
                });
            }    
        });
});

router.post('/:id/unattend', async (req, res) => {
    // Simple auth check
    //if (!req.isAuthenticated || !req.hasArtemis) 
    //    return res.status(401).json({ success: false, message: 'You are not authenticated.' });
    await Events.findOneAndUpdate( {_id: req.params.id}, 
        {$inc : {'participants' : -1}}, 
        {new: true})
        .then(function(ress) { 
            if (ress === null) {
                res.json({
                    success: false
                });
            } else {
                res.json({
                    success: true
                });
            }    
        });
});

//                                       //
// ––––––––––––––––––––––––––––––––––––– //
// /!\             ADMIN             /!\ //
// ––––––––––––––––––––––––––––––––––––– //
// DO NOT NOT ADMIN CHECK THIS SHIT OR   //
// I WILL FUCKING BLOW YOUR BRAINS UP    //
// ––––––––––––––––––––––––––––––––––––– //
//                                       //

router.post('/create', async (req, res) => {
    // Simple auth check
    if (!req.isAuthenticated) 
        return res.status(401).json({ success: false, message: 'You are not authenticated.' });
    if (!req.isAdmin) 
        return res.status(401).json({ success: false, message: 'Unauthorized.' });

    // Prevent duplicates
    /*if ((await Version.findOne({version: req.body.version.version})) != null) {
        return res.status(418).json({ success: false, message: 'Already exists.' });
    }

    // Check bootstrap
    if ((await Bootstrap.findOne({key: req.body.version.bootstrap.key})) == null) {
        return res.status(418).json({ success: false, message: 'Invalid bootstrap.' });
    }

    let buff = Buffer.from(req.body.version.data, 'base64');
    let result = await Cdn.createVersion(req.body.version.version, buff);
    
    // TODO: upload and bootstrap logic
    await Version.create({
        version: req.body.version.version,
        title: req.body.version.title,
        description: req.body.version.description,
        date: req.body.version.date,
        type: req.body.version.type,
        bootstrap: req.body.version.bootstrap,
        file: result.config.url
    });

    res.json({
        success: true    
    });*/
    res.json({
        success: true
    })
});

router.post('/edit', async (req, res) => {
    // Simple auth check
    if (!req.isAuthenticated) 
        return res.status(401).json({ success: false, message: 'You are not authenticated.' });
    if (!req.isAdmin) 
        return res.status(401).json({ success: false, message: 'Unauthorized.' });

    
    res.json({
        success: true    
    });
});

router.post('/delete', async (req, res) => {
     // Simple auth check
    if (!req.isAuthenticated) 
        return res.status(401).json({ success: false, message: 'You are not authenticated.' });
    if (!req.isAdmin) 
        return res.status(401).json({ success: false, message: 'Unauthorized.' });
    
    res.json({
        success: true
    });
});

module.exports = router;