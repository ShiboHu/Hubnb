const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Review, Spot, ReviewImage, SpotImage, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');


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

//get all the reviews of current user;
router.get('/current', requireAuth, async (req, res) => { 
    const reviews = await Review.findAll({ 
        where: { 
            userId: req.user.id
        },
        attributes: { 
            exclude: ['images']
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
            model: Spot,
            attributes: { 
                exclude: ['avgRating', 'numReviews', 'createdAt', 'updatedAt','description'],
            },
            }, 
            { 
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    if(reviews.length === 0){ 
        res.status(404);
        return res.json({ 
            message: 'current user does not have any reviews',
            statusCode: 404
        })
    }

    for(let i = 0; i < reviews.length; i++){ 
        var id = reviews[i].spotId
    };

    const previewUrl = await SpotImage.findAll({ 
        where: { 
            spotId : id,
            preview: true
        },
        attributes: ['url']
    });

    reviews.forEach(review=> { 
        review.Spot.previewImage = previewUrl[0].dataValues.url
    })

    return res.json({ 
        Reviews: reviews
    })
});

//create an image for a review base in review id
router.post('/:reviewId/images', requireAuth, async  (req, res) => { 
    const { url } = req.body; 

    const review = await Review.findOne({ 
        where: { 
            id: req.params.reviewId
        }
    });


    if(!review){ 
        res.status(404); 
        return res.json({ 
            message: `Review couldn't be found`,
            statusCode: 404
        })
    };

     //authorization start!! 
     const checkReview = await Review.findByPk(req.params.reviewId);
     if(checkReview.userId !== req.user.id){ 
         res.status(403); 
         return res.json({ 
             message: 'Forbidden',
             statusCode: 403
         })
     };
     //authroization end!!

    const newImage = await ReviewImage.create({ 
        reviewId: +req.params.reviewId, 
        url
    });

    const revImg = await ReviewImage.findAll({ 
        where: { 
            reviewId: req.params.reviewId
        }
    })

    if (revImg.length >= 10) {
        res.status(403);
        res.json({
          message: "Maximum number of images for this resource was reached",
          statusCode: 403,
        });
      }

    return res.json({ 
        id: newImage.id,
        url: newImage.url
    })
});

//edit a review 
router.put('/:reviewId', validateReview, requireAuth, async (req, res) => { 
    const { review, stars} = req.body;

    
    const findReview = await Review.findOne({ 
        where: { 
            id: req.params.reviewId
        },
        attributes: { 
            exclude: ['images']
        }
    });

    if(!findReview){ 
        res.status(404); 
        return res.json({ 
            message: `Review couldn't be found`,
            statusCode: 404
        })
    };

     //authorization start!! 
     const checkReview = await Review.findByPk(req.params.reviewId);
     if(checkReview.userId !== req.user.id){ 
         res.status(403); 
         return res.json({ 
             message: 'Forbidden',
             statusCode: 403
         })
     };
     //authroization end!!

    const updateReview = await findReview.update({ 
        review, 
        stars,
    })

    res.json(updateReview)
});

//delete a review 
router.delete('/:reviewId', requireAuth, async (req, res) => { 

    const findReview = await Review.findOne({ 
        where: { 
            id: req.params.reviewId
        }
    });

    if(!findReview){ 
        res.status(404); 
        return res.json({ 
            message: `Review couldn't be found`,
            statusCode: 404
        })
    };

      //authorization start!! 
      const checkReview = await Review.findByPk(req.params.reviewId);
      if(checkReview.userId !== req.user.id){ 
          res.status(403); 
          return res.json({ 
              message: 'Forbidden',
              statusCode: 403
          })
      };
      //authroization end!!

    await findReview.destroy(); 

    res.json({ 
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router;
