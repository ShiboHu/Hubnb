const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
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
  router.post('/', validateSignup, async (req, res) => {
      const { firstName, lastName, phoneNumber, email, password, username } = req.body;
      const user = await User.signup({ firstName, lastName, phoneNumber, email, username, password });


      await setTokenCookie(res, user);
    
      return res.json({
        user: user
      });
    }
  );

  router.get('/' , async (req, res) => { 
      res.send('signup with firstName, lastName, username, email and phone number')
  })
module.exports = router;
