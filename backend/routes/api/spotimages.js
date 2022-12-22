const express = require('express');
const router = express.Router(); 

const {requireAuth } = require('../../utils/auth');
const {SpotImage} = require('../../db/models');


router.delete('/:spotImageId', requireAuth, async (req, res) => { 
    const image = await SpotImage.findByPk(req.params.spotImageId); 

    if(!image){ 
        res.status(404); 
        return res.json({ 
            message: `Spot Image couldn't be found`, 
            statusCode: 404
        })
    }

    await image.destroy();

    res.json({ 
        message: 'Successfully deleted',
        statusCode: 200
    })
})


module.exports = router;
