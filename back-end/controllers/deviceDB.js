const { User } = require("../models/users.js");
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

  client.set(otp, email);
  client.expire(otp, 2000); // 입력시간을 고려하여 3분 20초 설정

  res.status(200).json({
    email: email,
    otp: otp,
  });
}

async function connect(req, res) {
  const otp = req.body.otp;

  const useremail = await client.get(otp);

  await User.findOneAndUpdate(
    { email: useremail },
    { isConnected: true },
    (err, user) => {}
  );

  return res.status(200).json({
    isConnected: true,
    useremail: useremail,
  });
}

function checkConnect(req, res) {
  console.log(req.user.isConnected);
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return res.json({
        err,
      });
    }
    res.cookie("isConnected", user.isConnected).status(200).json({
      isConnected: user.isConnected,
    });
  });
}

exports.issue = issue;
exports.connect = connect;
exports.checkConnect = checkConnect;
