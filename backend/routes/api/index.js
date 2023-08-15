const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spots.js'); 
const reviewRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const spotImageRouter = require('./spotimages');
const reviewImageRouter = require('./reviewimage');
const mapsRouter = require('./maps');


const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);
router.use('/session', sessionRouter); //login, logout
router.use('/users', usersRouter); //signup
router.use('/spots', spotRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImageRouter);
router.use('/review-images', reviewImageRouter);
router.use('/maps', mapsRouter);

module.exports = router;
