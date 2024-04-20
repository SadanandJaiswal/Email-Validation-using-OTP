const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP for Email Verification',
      text: `Your OTP is: ${otp}, it will valid only for 5 Minute from now.`,
    };
  
    await transporter.sendMail(mailOptions);
};
  
module.exports = sendOTP;