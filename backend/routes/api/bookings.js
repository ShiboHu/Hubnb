const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, SpotImage, Booking } = require('../../db/models');
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

//edit a booking 
router.put('/:bookingId', requireAuth, async (req, res) => { 
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking){ 
        res.status(404); 
        return res.json({ 
            message: `Booking could'nt be found`,
            statusCode: 404
        })
    };

    const date = Date.now();

    if(Date.parse(startDate) < date && Date.parse(endDate) < date){ 
        res.status(403);
        return res.json({ 
            message: `Past bookings can't be modified`,
            statusCode: 403
        })
    };

    if(endDate < startDate){ 
        res.status(400);
        return res.json({ 
            message: "Validation error",
            statusCode: 400,
            errors: [
              "endDate cannot come before startDate"
            ]
        })
    };
    
    for(let i = 0; i < booking.length; i++){ 
        let allStartDate = booking[i].dataValues.startDate;
        let allEndDate = booking[i].dataValues.endDate;
        if(startDate <= allEndDate && startDate >= allStartDate
            || endDate >= allStartDate && endDate <= allEndDate){
                res.status(403)
                return res.json({ 
                    message: "Sorry, this spot is already booked for the specified dates",
                    statusCode: 403,
                    errors: [
                      "Start date conflicts with an existing booking",
                      "End date conflicts with an existing booking"
                    ]
                })
        }
    };

    const updateBooking = await booking.update({ 
        startDate,
        endDate,
    });

    return res.json(updateBooking)
});


router.delete('/:bookingId', requireAuth, async (req, res ) => { 
    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking){ 
        res.status(404);
        return res.json({ 
            message: `Booking couldn't be found`,
            statusCode: 404
        })
    };

    const date = Date.now(); 
    const startDate = booking.dataValues.startDate; 
    const endDate = booking.dataValues.endDate;

    if(Date.parse(startDate) <= date && Date.parse(endDate) >= date){ 
        res.status(403);
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }

    await booking.destroy();

    return res.json({ 
        message: "Successfully deleted",
        statusCode: 200
    });
});


module.exports = router; 
