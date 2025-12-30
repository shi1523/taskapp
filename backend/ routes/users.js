const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteAccount
} = require('../controllers/userController');
const auth = require('../middleware/auth');


router.use(auth);


router.get('/profile', getProfile);


router.put('/profile', updateProfile);


router.delete('/profile', deleteAccount);

module.exports = router;
