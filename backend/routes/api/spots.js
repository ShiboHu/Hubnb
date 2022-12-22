const express = require('express');
const router = express.Router();

const {requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');


const validateSpot = [
    check("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check("city").exists({ checkFalsy: true }).withMessage("City is required"),
    check("state").exists({ checkFalsy: true }).withMessage("State is required"),
    check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check("latitude").exists({ checkFalsy: true }),
    check("longitude")
      .exists({ checkFalsy: true })
      .withMessage("Longitude is not valid"),
    check("name")
      .exists({ checkFalsy: true })
      .withMessage("Name is required")
      .isLength({ max: 49 })
      .withMessage("Name must be less than 50 characters"),
    check("description")
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    check("price")
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors,
  ];

  const validateReview = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .withMessage("Stars is required")
      .isInt({ min: 1, max: 5 })
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
  ];


  // get all spots 
    router.get('/', async (req, res) => { 
        const allSpots = await Spot.findAll({}); 

     res.json({ 
        Spots: allSpots
     }); 
});

    //getting current user spots
    router.get('/current', requireAuth, async (req, res) => { 
        const currentUserSpot = await Spot.findAll({ 
          where: { 
            ownerId : req.user.id
          },
          attributes: { 
            exclude: ['numReviews']
          }
        });

        const avgRating = await Review.findAll({ 
            where: { 
                spotId: req.user.id
            },
            attributes: ['stars']
        })

        let sumRating = 0; 
        avgRating.forEach(rating => { 
            sumRating += rating.dataValues.stars / avgRating.length;
        })
        
        
        const previewUrl = await SpotImage.findAll({ 
            where: { 
                spotId : req.user.id,
                preview: true
            },
            attributes: ['url']
        });
        
        
        if(currentUserSpot.length >= 1){ 
            return res.json({ 
                Spots: currentUserSpot
            });
        }else { 
          currentUserSpot[0].dataValues.avgRating = sumRating; 
          currentUserSpot[0].dataValues.previewImage = previewUrl[0].dataValues.url
            return res.json({ 
                message: 'Current user does not have any spots'
            });
        }
    });


//get spots details by id
    router.get('/:spotId', async (req, res) => { 
     const spot = await Spot.findByPk(req.params.spotId, { 
         include:
            [
            {
                model: SpotImage,
               attributes: ['id', 'url', 'preview'] ,
            },
            {
             model: User, 
             attributes: ['id', 'firstName','lastName'],
            }
            ]
    })

    const avgRating = await Review.findAll({ 
        where: { 
            spotId: req.user.id
        },
        attributes: ['stars']
    })

    let sumRating = 0; 
    avgRating.forEach(rating => { 
        sumRating += rating.dataValues.stars / avgRating.length;
    })
    
    
    const previewUrl = await SpotImage.findAll({ 
        where: { 
            spotId : req.user.id,
            preview: true
        },
        attributes: ['url']
    });
    
    
    if(!spot){ 
        res.status(404);
        return res.json({ 
            message: `Spot couldn't be found`,
            StatusCode: 404,
        })
    }

    spot.dataValues.avgRating = sumRating; 
    spot.dataValues.previewImage = previewUrl[0].dataValues.url;
    spot.dataValues.numReviews = avgRating.length;

    return res.json(spot);
});

//current user creating new spot
router.post('/', requireAuth, validateSpot,  async(req, res) => { 

    const {name, address, city, country, price,
          latitude, longitude, description, avgRating, previewImage} = req.body;

   const newSpot = await Spot.create({ 
        name, 
        ownerId: req.user.id,
        address, 
        city, 
        country,
        price,
        latitude, 
        longitude,
        description,    
        avgRating,
        previewImage
      })

        res.status(201);
        return res.json(newSpot)
  });

//get spot image by current spot 
    router.get('/:spotId/images', requireAuth, async (req, res) => { 
        const image = await SpotImage.findAll({ 
            where: { 
                spotId: req.params.spotId
            }
        })
        
        if(!image){ 
            res.status(404)
            res.json({ 
                message: 'Spot couldnt be found',
                StatusCode: 404
            })
        } else { 
            res.json(image)
        }
    })

//create spot image by current user
    router.post('/:spotId/images',  requireAuth ,async (req, res) => { 
        const { url, preview} = req.body;

       const spot = await Spot.findByPk(req.params.spotId);

       if(!spot){ 
           res.status(404); 
           return res.json({ 
               message: "Spot couldnt be found", 
               StatusCode : 404
           });
        };

       const newImage = await SpotImage.create({ 
            spotId : req.params.spotId,
            url, 
            preview
        });
   
        if(!newImage){ 
            res.status(404)
            return res.json({message: 'Image was not created'})
        };

        const allImages = await SpotImage.findAll();

        const withoutSpotId = await SpotImage.findOne({ 
            where: { 
                spotId: req.params.spotId,
                id: allImages.length
            },
            attributes: { 
                exclude: ['spotId', 'createdAt', 'updatedAt']
            }
        })

        return res.json(withoutSpotId)
});


    //Edit a spot
    router.put('/:spotId', validateSpot, requireAuth, async (req, res) => { 
        const { name, ownerId, address, city, country, 
             price, latitude, longitude, description } = req.body;

        const spot = await Spot.findOne({
            where: { 
                id: req.params.spotId
            },
            attributes: { 
                exclude: ['avgRating', 'previewImage', 'numReviews']
            }
        });

       if(!spot){ 
        res.status(404); 
        return res.json({ 
            message: "Spot couldnt be found", 
            StatusCode : 404
        });
     };

       const newSpot =  await spot.update({ 
            name, 
            ownerId,
            address,
            city, 
            country,
            price,
            latitude,
            longitude,
            description
        })

        res.json(newSpot)
    });

    //delete a spot 
    router.delete('/:spotId', requireAuth, async (req, res) => { 
        const spot = await Spot.findByPk(req.params.spotId);

        if(!spot){ 
            res.status(404); 
            return res.json({ 
                message: "Spot couldnt be found", 
                StatusCode : 404
            });
         };

        await spot.destroy();

        res.json({ 
            message: "Successfully deleted",
            statusCode: 200
        })
    });

    //  Get all Reviews by a Spot's id
    router.get('/:spotId/reviews', async (req, res) => { 
        const review = await Review.findByPk(req.params.spotId, { 
            attributes: { 
                exclude: ['images']
            },
            include: [
                { 
                    model: User,
                    attributes: ['id','firstName', 'lastName']
                },
                {
                    model: ReviewImage, 
                    attributes: ['id','url']
                }
            ]
        }); 

        if(!review){ 
            res.status(404);
            return res.json({
                message: `Spot couldn't be found`,
                statusCode: 404
            })
        };

        return res.json({ 
            Reviews: review
        })
    });

    //create a review for a spot base on spot id
     router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res) => { 
        const { review, stars } = req.body

        const spot = await Spot.findOne({ 
            where: { 
                id: req.params.spotId
            }
        })
        if(!spot){ 
            res.status(404);
            return res.json({
                message: `Spot couldn't be found`,
                statusCode: 404
            })
        };

        const oldReview = await Review.findOne({ 
            where: { 
                userId: req.user.id, 
                spotId: +req.params.spotId
            }
        })

        if(oldReview){ 
            res.status(403);
            return res.json({ 
                message: 'User already have review for this spot'
            })
        }
        const newReview = await Review.create({ 
            userId: req.user.id,
            spotId: +req.params.spotId,
            review,
            stars
        })

       return res.json(newReview)
    });

    //get all booking for a spot by spot id.
    router.get('/:spotId/bookings', requireAuth ,async (req, res) => { 
        const spot = await Spot.findByPk(req.params.spotId); 

        if(!spot){ 
            res.status(404);
            return res.json({ 
                message: `Spot couldn't be found`,
                statusCode: 404
            })
        };

        const bookings = await Booking.findAll({ 
            where: { 
                spotId: req.params.spotId
            },
        });
        
        const bookNotOwner = await Booking.findAll({
            where: { 
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        }) ;

        const bookIsOwner = await Booking.findAll({ 
            where: { 
                spotId: req.params.spotId
            },
            include: { 
                model: User, 
                where: { 
                    id: spot.ownerId
                },
                attributes: ['id', 'firstName', 'lastName']
            }
        })
        let currSpotUserId = 0;

        bookings.forEach(el => { 
            currSpotUserId += +el.dataValues.userId;
        });

        if(spot.ownerId === currSpotUserId){ 
            return res.json({ 
                Bookings: bookIsOwner
            })
        }else { 
            return res.json({ 
                Bookings: bookNotOwner
            })
        }
    });

    //Create a Booking from a Spot based on the Spot's id
    router.post("/:spotId/bookings", requireAuth, async (req, res) => {
        const { startDate, endDate } = req.body;

        const spot = await Spot.findByPk(req.params.spotId);
      
        if (!spot) {
          res.status(404);
          res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
          });
        }
        
        const allBookings = await Booking.findAll({
          where: {
            spotId: spot.id,
          },
        });

        if(endDate <= startDate){ 
            res.status(400);
            return res.json({ 
                message: "Validation error",
                statusCode: 400,
                errors: [
                  "endDate cannot be on or before startDate"
                ]
            })
        };
        
        for(let i = 0; i < allBookings.length; i++){ 
            let allStartDate = allBookings[i].dataValues.startDate;
            let allEndDate = allBookings[i].dataValues.endDate;
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
        }


        const newBooking = await Booking.create({
          spotId: req.params.spotId,
          userId: req.user.id,
          startDate,
          endDate
        });

        return res.json(newBooking);
      });

module.exports = router;
