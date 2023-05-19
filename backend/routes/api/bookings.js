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
              exclude: ['updatedAt', 'createdAt', 'numReviews','description']
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
            let id = booking[i].dataValues.spotId
            let previewUrl = await SpotImage.findOne({ 
                where: { 
                    spotId: id,
                    preview: true
                },
                attributes: ['url']
            });
            if(!previewUrl){ 
                booking[i].Spot.dataValues.previewImage = 'current spot does not have preview images'
            }else { 
                booking[i].Spot.dataValues.previewImage = previewUrl.url
            }
        }
    
    return res.json({ 
        booking
    })
});

//edit a booking 
router.put('/:bookingId', requireAuth, async (req, res) => { 
    const { startDate, endDate } = req.body;
    
    const booking = await Booking.findByPk(req.params.bookingId);
    
    if(!booking){ 
        res.status(404); 
        return res.json({ 
            message: `Booking couldn't be found`,
            statusCode: 404
        })
    };
    
    // authorization start!!
    if(booking.userId !== req.user.id){ 
        res.status(403); 
        return res.json({ 
            message: 'Forbidden',
            statusCode: 403
        })
    };
    //authorization end!!

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

    const spot = await Spot.findByPk(booking.spotId)
   
    const currentBookings = await Booking.findAll({
        where: {
            spotId : spot.id
        }
    });
    const startDateTime = Date.parse(startDate);
    const endDateTime = Date.parse(endDate);
    for (let i = 0; i < currentBookings.length; i++) {
        let allBookingStart = Date.parse(currentBookings[i].startDate);
        let allBookingEnd = Date.parse(currentBookings[i].endDate);
        
        if ((startDateTime >= allBookingStart && startDateTime <= allBookingEnd) ||
            (endDateTime >= allBookingStart && endDateTime <= allBookingEnd) || 
            (startDateTime <= allBookingStart && endDateTime >= allBookingEnd)) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    };

    const updateBooking = await booking.update({ 
        startDate,
        endDate,
    });

    return res.json(updateBooking)
});

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res ) => { 
    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking){ 
        res.status(404);
        return res.json({ 
            message: `Booking couldn't be found`,
            statusCode: 404
        })
    };

    //authorization start!! 
    const owner = booking.dataValues.userId;
    const userId = req.user.id;
    if(owner !== userId){ 
        res.status(403); 
        return res.json({ 
           message: 'Forbidden',
           statusCode: 403
        })
    };
    //authorization end!!

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
