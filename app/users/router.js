require('../auth/model.js');
const express = require("express");
const router = express.Router();
const controller = require('./controller');
const passport = require('passport');
require('../middleware/authenticate.js')(passport);

//getEmailWithPost
router.post('/getAllUsers', controller.getAllUsers);

//find user details
router.get('/getUserById/:id', controller.findUserData);

// Update a user
router.put('/updateUser/:id', controller.update);

// Delete a user
router.delete('/deleteUser/:id', controller.deleteUser);


module.exports = router;