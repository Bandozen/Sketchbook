const { User } = require("../models/users.js");
const { Device } = require("../models/device");
const { client } = require("../server.js");
const otpGenerator = require("otp-generator");
let OTP = "0000";

function issue(req, res) {
  const { email } = req.user;

  // Generate a random OTP using the otp-generator package
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  OTP = otp;

  client.set(otp, email);
  client.expire(otp, 200); // 입력시간을 고려하여 3분 20초 설정

  res.status(200).json({
    email: email,
    otp: otp,
  });
}

async function checkConnect(req, res) {
  const flag = await client.get(OTP);

  if (flag === "true") {
    User.findOneAndUpdate({ _id: req.user._id }, { isConnected: true }, (err, user) => {
      if (err) {
        return res.json({
          err,
        });
      }
      client.del(OTP);
      res.cookie("isConnected", user.isConnected).status(200).json({
        isConnected: user.isConnected,
      });
    });
  }

  else {
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
}

exports.issue = issue;
exports.checkConnect = checkConnect;
