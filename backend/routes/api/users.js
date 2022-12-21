const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
    handleValidationErrors
  ];
//methods end!!!

// Sign up
  //check for validate signup inputs 
  router.post('/',  validateSignup, async (req, res) => {
      const { 
        firstName, 
        lastName, 
        email, 
        password, 
        username 
      } = req.body;

      const checkEmail = await User.findOne({where:{email}});
      const checkUserName = await User.findOne({where: {username}});

      if(checkEmail){ 
        res.status(403);
        return res.json({ 
          message: "User already exists", 
          StatusCode: 403,
          errors: [
            "User with that email already exists"
          ]
        });
      };

      if(checkUserName){ 
        res.status(403);
        return res.json({ 
          message: "User already exists", 
          StatusCode: 403,
          errors: [
            "User with that username already exists"
          ]
        });
      };

      const user = await User.signup({ 
        firstName,
        lastName,
        email,
        username, 
        password 
      });

      await setTokenCookie(res, user)

      user.dataValues.token = "";
      
       return res.json({ 
        user: user
      })
    }
  );

  //if logined in return user, else signup
  router.get('/', (req, res) => {
    const { user } = req;

    user.dataValues.token =  setTokenCookie(res, user);

    if (user) {
      return res.json({
        user
      });
    } else return res.json({user: null });
  }
);



  
module.exports = router;
