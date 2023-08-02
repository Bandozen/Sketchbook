const { Device } = require("../models/device");
const { client } = require("../server.js");
const otpGenerator = require('otp-generator');

function issue(req, res) {    

    const { email } = req.user;

    // Generate a random OTP using the otp-generator package
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    client.set(otp, email);
    client.expire(otp, 300);

    res.status(200).json({
        email: req.user.email,
        otp: otp,
      })
}

exports.issue = issue;