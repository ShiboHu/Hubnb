const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');

//get all the reviews of current user;
router.get('/current', requireAuth, async (req, res) => { 
    const reviews = await Review.findAll()
});



module.exports = router;
