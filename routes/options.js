const express = require('express');
const router = express.Router();
const passport = require('passport');

const optionsController = require('../controllers/options_api');

router.post('/:id/add_vote',  optionsController.vote);
router.get('/:id/delete', optionsController.destroy);


module.exports = router;