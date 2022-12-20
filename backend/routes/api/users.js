const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Router } = require('express');

//methods start!! 
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
      check('firstName')
      .exists({checkFalsy: true}) 
      .withMessage('please enter firstName'),
      check('lastName')
      .exists({checkFalsy: true}) 
      .withMessage('please enter lastName'),
      check('phoneNumber')
      .exists({checkFalsy: true}) 
      .isLength({min: 10, max: 12})
      .withMessage('please enter a valid phone number'), 
    handleValidationErrors
  ];
//methods end!!!

// Sign up
  //check for validate signup inputs 
  router.post('/', validateSignup, async (req, res, next) => {
      const { firstName, lastName, phoneNumber, email, password, username } = req.body;
      const user = await User.signup({ firstName, lastName, phoneNumber, email, username, password });

      const checkEmail = User.findAll({ 
        email: user.email
      });

      if(checkEmail){ 
        const err = new Error('SignUp failed'); 
        err.status = 403;
        err.title = 'SignUp failed';
        err.errors = ['The provided email already exists.'];
        return next(err);
      }
      await setTokenCookie(res, user);
    
      return res.json({
        user: user
      });
    }
  );

  //if logined in return user, else signup
  router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject(),
      });
    } else return res.json({message: 'sign up on this page' });
  }
);

  //getting current user spots
  router.get('/spots', async (req, res) => { 
      const currentUserSpot = await Spot.findAll({ 
        where: { 
          ownerId : req.user.id
        }
      })
      res.json({ 
        Spots: currentUserSpot
      });
  });

  //creating new spot
  router.post('/spots', async(req, res, err) => { 

    const {name, adress, city, country, price,
          latitude, longitude, description, avgRating, previewImage} = req.body;

   const newSpot = await Spot.create({ 
        name, 
        ownerId: req.user.id,
        adress, 
        city, 
        country,
        price,
        latitude, 
        longitude,
        description,    
        avgRating,
        previewImage
      })

      res.json({
        message: 'New Spot Created Successfully',
        newSpot
      })
   
    
  }) 

module.exports = router;
