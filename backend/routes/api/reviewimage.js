const express = require('express');
const router = express.Router(); 

const {requireAuth } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');


router.delete('/:reviewImageId', requireAuth, async (req, res) => { 
    const reviewImage = await ReviewImage.findByPk(req.params.reviewImageId);

    if(!reviewImage){ 
        res.status(404);
        return res.json({
            message: `Review Image couldn't be found`,
            statusCode: 404
        })
    }

    await reviewImage.destroy();

    res.json({ 
        message: `Successfully Deleted`, 
        statusCode: 200 
    })
});


module.exports = router;
