const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spots.js'); 
const reviewRouter = require('./reviews');

const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);
router.use('/session', sessionRouter); //login, logout
router.use('/users', usersRouter); //signup
router.use('/spots', spotRouter);
router.use('/reviews', reviewRouter);

  
module.exports = router;
