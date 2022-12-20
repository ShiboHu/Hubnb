const express = require('express');
const router = express.Router();

const { Spot, User } = require('../../db/models');


router.get('/', async (req, res) => { 
    const allSpots = await Spot.findAll({}); 

    res.json({ 
        Spots: allSpots
    }); 
})





module.exports = router;
