const express = require('express');
const passport = require('passport');

const router = express.Router();

console.log('router loaded');


router.use('/users', require('./users'));
router.use('/questions',passport.authenticate('jwt', {session: false}), require('./questions'));
router.use('/options', passport.authenticate('jwt', {session: false}),require('./options'));


module.exports = router;