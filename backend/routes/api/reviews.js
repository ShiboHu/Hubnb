const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Review, Spot, ReviewImage, SpotImage } = require('../../db/models');

//get all the reviews of current user;
router.get('/current', requireAuth, async (req, res) => { 
    const reviews = await Review.findAll({ 
        where: { 
            userId: req.user.id
        },
        include: [
            {
            model: Spot,
            attributes: { 
                exclude: ['avgRating', 'numReviews', 'createdAt', 'updatedAt'],
            },
            }, 
            { 
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

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


module.exports = router;
