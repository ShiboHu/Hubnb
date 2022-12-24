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

    if(booking.length === 0){ 
        res.status(404); 
        return res.json({ 
            message: 'current user does not have any bookings',
            statusCode: 404
        })
    }
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
    
    // authroization start!!
    if(booking.userId !== req.user.id){ 
        res.status(403); 
        return res.json({ 
            message: 'Forbidden',
            statusCode: 403
        })
    };
    //authroization end!!
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
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
    const bookingStartDate = new Date(booking.startDate).getTime();
    const bookingEndDate = new Date(booking.endDate).getTime();
    if ((startDateTime >= bookingStartDate && startDateTime < bookingEndDate) ||
    (endDateTime > bookingStartDate && endDateTime <= bookingEndDate)) {
    res.status(403);
    return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
        }
    })
}

    const updateBooking = await booking.update({ 
        startDate,
        endDate,
    });

    return res.json(updateBooking)
});

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res ) => { 
    const booking = await Booking.findByPk(req.params.bookingId);
    const spot = await Spot.findByPk(req.user.id)
    if(!booking){ 
        res.status(404);
        return res.json({ 
            message: `Booking couldn't be found`,
            statusCode: 404
        })
    };

    // authroization start!!
    if(+booking.userId !== req.user.id || +spot.ownerId !== req.user.id){ 
        res.status(403); 
        return res.json({ 
           message: 'Forbidden',
           statusCode: 403
        })
    };
    //authroization end!!

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
