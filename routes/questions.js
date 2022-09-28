const express = require('express');
const router = express.Router();
const passport = require('passport');

const questionsController = require('../controllers/questions_api');
const optionsController = require('../controllers/options_api');


router.post('/create',  questionsController.create);
router.get('/:id/destroy', questionsController.destroy);
router.post('/:id/options/create', optionsController.create);
router.get('/getall', questionsController.getall);
router.get('/:id', questionsController.getone);

module.exports = router;