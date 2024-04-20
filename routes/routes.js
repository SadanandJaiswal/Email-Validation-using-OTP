const express = require('express');
const {registerUser, verifyOTP, loginUser, logout, getUserDetails, updateProfile} = require('../controllers/userController');
const { isAuthenticatedUser} = require('../middleware/auth');

const router = express.Router();

// user routes
router.post("/register", registerUser);
router.put("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/me", isAuthenticatedUser, getUserDetails); 
router.put("/me/profile", isAuthenticatedUser, updateProfile);

module.exports = router;