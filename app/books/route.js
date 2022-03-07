const express = require('express');
const bookCtrl = require('./controller');
const router = express.Router(); // eslint-disable-line new-cap
const passport = require('passport');

require('../middleware/authenticate.js')(passport);

router.post('/create_book', bookCtrl.createBook);

router.post('/get_all_books', bookCtrl.getAllBook);

router.put('/update_book/:id', bookCtrl.updateDetails);

router.delete('/remove_book/:id', bookCtrl.remove);

module.exports = router;
