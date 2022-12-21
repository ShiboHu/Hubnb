const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, User, SpotImage, Review } = require('../../db/models');
const { ValidationError } = require('sequelize');


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
router.post('/', requireAuth, async(req, res) => { 

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

      if(!newSpot){ 
        res.status(400); 
        return res.json({ 
            message: 'Validation Error', 
            statusCode: 400, 
            errors: `${ValidationError} is required`
        })
      }else { 
        res.status(201);
        return res.json(newSpot)
      }
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
//post spot image by current user
    router.post('/:spotId/images',  requireAuth ,async (req, res) => { 
        const { url, preview} = req.body;

        const spot = await Spot.findByPk(req.params.spotId);

       const newImage = await SpotImage.create({ 
            spotId : req.params.spotId,
            url, 
            preview
        });

        if(!spot){ 
            res.status(404); 
            res.json({ 
                message: "Spot couldnt be found", 
                StatusCode : 404
            })
        }else { 
            res.json(newImage)
        }
});


module.exports = router;
