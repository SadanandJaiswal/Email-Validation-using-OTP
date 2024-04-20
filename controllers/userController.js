const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const sendOTP = require("../utils/sendOTP");

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 300000);

    const user = await User.create({
      username,
      email,
      password,
      otp,
      otpExpires,
    });

    await sendOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP send to mail, please verify your mail",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Clear OTP fields and set user as verified
    user.otp = undefined;
    user.otpExpires = undefined;
    user.verified = true;

    await user.save();

    // Send token response
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter email and password",
    });
  }

  const user = await User.findOne({ email }).select("password verified");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  if (user.verified === false) {
    return res.status(400).json({
      success: false,
      message: "Please verify your email",
    });
  }

  sendToken(user, 200, res);
};

exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logout successful",
  });
};

// get user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update user profile
exports.updateProfile = async (req, res, next) => {
  const { username, location, age, workDetails } = req.body;

  const newUserData = {
    location,
    age,
    workDetails,
    username,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
};
