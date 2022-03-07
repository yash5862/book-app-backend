require('./model');
const express = require("express");
const router = express.Router();
const controller = require('./controller');

// Create a user
router.post('/signup', controller.create);

//login
router.post('/login', controller.login);

module.exports = router;