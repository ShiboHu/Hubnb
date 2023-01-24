const express = require('express');
const router = express.Router();

const {requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { Op } = require("sequelize");

const validateSpot = [
    check("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check("city").exists({ checkFalsy: true }).withMessage("City is required"),
    check("state").exists({ checkFalsy: true }).withMessage("State is required"),
    check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check("lat").exists({ checkFalsy: true }).withMessage('Latitude is not valid'),
    check("lng")
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
  router.get("/", async (req, res) => {
    let { page, size } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 20;
    }
  
    page = parseInt(page);  
    size = parseInt(size);
  
    let pagination = {};
  
    if (size >= 1 && page >= 1) {
      pagination.limit = size;
      pagination.offset = size * (page - 1);
    } else {
      res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          page: "Page must be greater than or equal to 0",
          size: "Size must be greater than or equal to 0",
          maxLat: "Maximum latitude is invalid",
          minLat: "Minimum latitude is invalid",
          minLng: "Maximum longitude is invalid",
          maxLng: "Minimum longitude is invalid",
          minPrice: "Maximum price must be greater than or equal to 0",
          maxPrice: "Minimum price must be greater than or equal to 0",
        },
      });
    }
  
    const allSpots = await Spot.findAll({
        attributes: { 
            exclude: ['numReviews']
        },
        ...pagination,
    });

    let rate = 0; 
    for(let i = 0; i < allSpots.length; i++){ 
        let id = allSpots[i].dataValues.id
        let previewUrl = await SpotImage.findOne({ 
            where: { 
                spotId: id,
                preview: true
            },
            attributes: ['url']
        });
        if(!previewUrl){ 
            allSpots[i].dataValues.previewImage = 'current spot does not have preview images'
        }else { 
            allSpots[i].dataValues.previewImage = previewUrl.url
        }
        let avgRate = await Review.findAll({ 
            where: { 
                spotId: id
            },
            attributes: ['stars']
        })
        for(let review of avgRate){ 
           var star = review.stars + rate / avgRate.length;
        }
        if(avgRate.length <= 0){ 
         allSpots[i].dataValues.avgRating = 'current spot does not have any ratings'
        }else { 
         allSpots[i].dataValues.avgRating += star 
        }
    }

   return res.json({ 
        Spots: allSpots,
        page,
        size
    })
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

        if(currentUserSpot.length === 0){ 
            res.status(404); 
            return res.json({ 
                message: "Current user doesnt not have any spots", 
                statusCode: 404
            })
        }
            
        let rate = 0; 
        for(let i = 0; i < currentUserSpot.length; i++){ 
            let id = currentUserSpot[i].dataValues.id
            let previewUrl = await SpotImage.findOne({ 
                where: { 
                    spotId: id,
                    preview: true
                },
                attributes: ['url']
            });
            if(!previewUrl){ 
                currentUserSpot[i].dataValues.previewImage = 'current spot does not have preview images'
            }else { 
                currentUserSpot[i].dataValues.previewImage = previewUrl.url
            }
            let avgRate = await Review.findAll({ 
                where: { 
                    spotId: id
                },
                attributes: ['stars']
            })
            for(let review of avgRate){ 
               var star = review.stars + rate / avgRate.length;
            }
            if(avgRate.length <= 0){ 
                currentUserSpot[i].dataValues.avgRating = 'current spot does not have any ratings'
            }else { 
                currentUserSpot[i].dataValues.avgRating += star 
            }
        }

        return res.json({ 
            Spots: currentUserSpot
        })

    });


//get spots details by id
    router.get('/:spotId', async (req, res) => { 
     const spot = await Spot.findByPk(req.params.spotId, { 
        include: { 
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        attributes: { 
            exclude: ['previewImage']
        }
     });
     
     if(!spot){ 
        res.status(404); 
        return res.json({ 
            message: `Spot couldn't be found`,
            statusCode: 404
        })
     };

     const spotImage = await SpotImage.findAll({ 
        where: { 
            spotId: req.params.spotId
        }
     });

     const spotOwner = await User.findOne({ 
        where: { 
            id: spot.dataValues.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
     });

     const spotReview = await Review.findAll({ 
        where: { 
            spotId: req.params.spotId
        },
        attributes: ['stars']
     });


     if(spotImage.length <= 0){ 
        spot.dataValues.SpotImages = 'Current spot does not have any images'
     };

     let star = 0; 
     spotReview.forEach(review => { 
        return star += review.dataValues.stars  / spotReview.length
     })

     spot.dataValues.avgRating = star;
     spot.dataValues.numReviews = spotReview.length;
     spot.dataValues.Owner = spotOwner;
     return res.json(spot)
});

  
//current user creating new spot
router.post('/', requireAuth, validateSpot,  async(req, res) => { 

    const {name, address, city, country, price, state,
          lat, lng, description} = req.body;

   const newSpot = await Spot.create({ 
        name, 
        ownerId: req.user.id,
        address, 
        city, 
        state,
        country,
        price,
        lat, 
        lng,
        description,    
      })

        res.status(201);
        return res.json({ 
            id: newSpot.id,
            name: newSpot.name,
            ownerId: newSpot.ownerId,
            address: newSpot.address,
            city: newSpot.city,
            state: newSpot.state,
            country: newSpot.country,
            price: newSpot.price,
            lat: newSpot.lat,
            lng: newSpot.lng,
            description: newSpot.description,
            createdAt: newSpot.createdAt,
            updatedAt: newSpot.updatedAt
        })
  });


//create spot image by current user
router.post('/:id/images', requireAuth, async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);
  
    if (!spot) {
      res.status(404);
      return res.json(
        {
          message: "Spot couldn't be found",
          statusCode: 404
        }
      );
    }
  
    if (spot.dataValues.ownerId !== req.user.id) {
      res.status(403);
      return res.json(
        {
          message: "Forbidden",
          statusCode: 403
        }
      );
    }
  
    const { url, preview } = req.body;
  
    const newImg = await SpotImage.create({
      spotId,
      url,
      preview: preview,
    });
  
    delete newImg.dataValues.createdAt;
    delete newImg.dataValues.updatedAt;
    delete newImg.dataValues.spotId;
  
    return res.json(newImg);
  });


    //Edit a spot
    router.put('/:spotId', validateSpot, requireAuth, async (req, res) => { 
        const { name, ownerId, address, city, country, 
             price, lat, lng, description } = req.body;

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

      //authorization start!! 
      const checkSpot = await Spot.findByPk(req.params.spotId);
      if(checkSpot.ownerId !== req.user.id){ 
          res.status(403); 
          return res.json({ 
              message: 'Forbidden',
              statusCode: 403
          })
      };
      //authroization end!!

       const newSpot =  await spot.update({ 
            name, 
            ownerId,
            address,
            city, 
            country,
            price,
            lat,
            lng,
            description
        })

        res.json(newSpot)
    });

    //delete a spot 
    router.delete('/:spotId', requireAuth, async (req, res) => { 
        const spot = await Spot.findByPk(req.params.spotId, { 
            where: { 
                ownerId: req.user.id
            }
        });

        if(!spot){ 
            res.status(404); 
            return res.json({ 
                message: "Spot couldnt be found", 
                StatusCode : 404
            });
         };

        //authorization start!! 
      const checkSpot = await Spot.findByPk(req.params.spotId);
      if(checkSpot.ownerId !== req.user.id){ 
          res.status(403); 
          return res.json({ 
              message: 'Forbidden',
              statusCode: 403
          })
      };
      //authroization end!!

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
                message: 'User already have review for this spot',
                statusCode: 403
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
    router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
        let user = req.user;
    
        const findSpot = await Spot.findByPk(req.params.spotId);
    
        if(!findSpot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: res.statusCode
            });
        }
    
        if (user.id === findSpot.ownerId){
            const ownerBooking = await Booking.findAll({
                where: {
                    spotId: findSpot.id
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "firstName", "lastName"]
                    }
                ]
            })
            return res.status(200).json({Bookings: ownerBooking});
        } else {
            const getBooking = await Booking.findAll({
                where: {
                    spotId: findSpot.id
                },
                attributes: ["spotId", "startDate", "endDate"]
            })
            return res.status(200).json({Bookings: getBooking});
        }
    })

    //Create a Booking from a Spot based on the Spot's id
    router.post("/:spotId/bookings", requireAuth, async (req, res) => {
        const { startDate, endDate } = req.body;
        const spotId = +req.params.spotId;
        const userId = req.user.id;
        
        
        
        const spot = await Spot.findOne({
            where: {
                id: spotId,
            },
            [Op.not]: { ownerId: req.user.id }
        });
        
        if(!spot) {
            res.status(404);
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        
        if(spot.ownerId === userId) {
            res.status(403);
            res.json({
            message: "Can't create booking for your own spot",
            statusCode: 403
        })
    }
    
    if(startDate >= endDate) {
        res.status(400);
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }
    
    const currentBookings = await Booking.findAll({
        where: {
            spotId
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

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    });
    return res.json(newBooking)
      });


module.exports = router;
