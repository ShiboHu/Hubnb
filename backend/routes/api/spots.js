const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, User, SpotImage } = require('../../db/models');

// get all spots 
    router.get('/', async (req, res) => { 
        const allSpots = await Spot.findAll({}); 

     res.json({ 
        Spots: allSpots
     }); 
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
     if(!spot){ 
        res.status(404);
        res.json({ 
            message: 'Spot couldnt be found',
            StatusCode: 404,
        })
    }
    res.json(spot)
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
