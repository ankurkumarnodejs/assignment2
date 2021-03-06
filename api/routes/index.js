var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'assignment',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/check', ctrlAuth.check);
router.post('/addcontact', ctrlAuth.addContact);
router.post('/listcontact', ctrlAuth.listContact);
router.post('/updatecontact', ctrlAuth.updateContact);
router.post('/login', ctrlAuth.login);

module.exports = router;
