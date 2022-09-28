const express = require('express');

const router = express.Router();
const usersApi = require('../controllers/users_api');

router.post('/register', usersApi.create);

router.post('/authenticate', usersApi.createSession);

module.exports = router;