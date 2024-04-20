const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  console.log("token is ", token);

  if (!token) {
    return next(new Error("Please Login to access this resource"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedData.id);

  next();
};
