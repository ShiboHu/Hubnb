const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Booking } = require('../../db/models');
const { check } = require('express-validator');


//get all current users bookings 
router.get('/current', requireAuth, async (req, res) => { 
    const booking = await Booking.findAll({ 
        where: { 
            userId: req.user.id
        },
        include: { 
            model: Spot,
            attributes: { 
              exclude: ['updatedAt', 'createdAt', 'numReviews', 'avgRating','description']
            }
        }
    })
    for(let i = 0; i < booking.length; i++){ 
        var allbook = booking[i].dataValues; 
    }

    const previewImg = await SpotImage.findOne({ 
        where: { 
            spotId: allbook.spotId
        },
        attributes: ['url']
    });
    

allbook.Spot.dataValues.previewImage = previewImg.dataValues.url

    return res.json({ 
        Bookings: booking
    })
});




module.exports = router; 
