const express = require('express');
const router = express.Router(); 

const {requireAuth } = require('../../utils/auth');
const { SpotImage, Spot} = require('../../db/models');


router.delete('/:spotImageId', requireAuth, async (req, res) => { 
    const { spotImageId } = req.params
    const image = await SpotImage.findByPk(spotImageId) 

    
    if(!image){ 
        res.status(404); 
        return res.json({ 
            message: `Spot Image couldn't be found`, 
            statusCode: 404
        })
    }
    
    //authroization start!! 
    const spot = await Spot.findByPk(image.spotId)
   if(req.user.id !== spot.ownerId){ 
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
   }
    //authorization end!!

    await image.destroy();

    res.json({ 
        message: 'Successfully deleted',
        statusCode: 200
    })
})


module.exports = router;
