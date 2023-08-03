const { Device } = require("../models/device");
const { client } = require("../server.js");
const otpGenerator = require("otp-generator");

function issue(req, res) {
  const { email } = req.user;

  // Generate a random OTP using the otp-generator package
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  client.set(email, otp);
  client.expire(email, 20); // 입력시간을 고려하여 3분 20초 설정

  res.status(200).json({
    email: email,
    otp: otp,
  });
}

async function connect(req, res) {
  const otp = req.body.otp;

  const useremail = await client.get(otp);

  return res.status(200).json({
    loginSuccess: true,
    useremail: useremail,
  });
}

exports.issue = issue;
exports.connect = connect;
