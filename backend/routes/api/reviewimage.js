const express = require('express');
const router = express.Router(); 

const {requireAuth } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models');


router.delete('/:reviewImageId', requireAuth, async (req, res) => { 
    const reviewImage = await ReviewImage.findByPk(req.params.reviewImageId);

    if(!reviewImage){ 
        res.status(404);
        return res.json({
            message: `Review Image couldn't be found`,
            statusCode: 404
        })
    }

    //authorization start!
    const review = await Review.findByPk(reviewImage.reviewId)
    if(req.user.id !== review.userId){ 
        res.status(403);
        return res.json({ 
            message: 'Forbidden',
            statusCode: 403
        })
    }
    //authorization end!
    await reviewImage.destroy();

    res.json({ 
        message: `Successfully Deleted`, 
        statusCode: 200 
    })
});


module.exports = router;
