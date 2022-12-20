const express = require('express');
const router = express.Router();

const { Spot, User } = require('../../db/models');


router.get('/', async (req, res) => { 
    const allSpots = await Spot.findAll({}); 

    res.json({ 
        Spots: allSpots
    }); 
})

router.get('/:userId', async (req, res) => { 
    const currUserSpot = await User.findAll({ 
        where: { 
            id: req.params.userId
        },
        include: { 
            model: Spot
        }
    })
    
    res.json(currUserSpot)
})





module.exports = router;
