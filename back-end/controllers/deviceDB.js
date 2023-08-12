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

  client.select(0);
  client.set(otp, email);
  client.expire(otp, 200); // 입력시간을 고려하여 3분 20초 설정

  res.status(200).json({
    // email: email,
    otp: otp,
  });
}

async function checkConnect(req, res) {
  client.set(req.user.email, 'ready');
  const flag = await client.get(OTP);

  if (flag === "true") {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { isConnected: true },
      (err, user) => {
        if (err) {
          return res.json({
            err,
          });
        }
        client.del(OTP);
        res.cookie("isConnected", user.isConnected).status(200).json({
          // isConnected: user.isConnected,
        });
      }
    );
  } else {
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) {
        return res.json({
          err,
        });
      }

      res.cookie("isConnected", user.isConnected).status(200).json({
        // isConnected: user.isConnected,
      });
    });
  }
}

function disconnect(req, res) {
  if (req.user.email == "connect@test.com") {
    res.status(200).json({
      success: true,
    });
  } else {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { isConnected: false },
      (err, user) => {
        if (err) {
          return res.json({
            success: false,
            err,
          });
        }
    client.set(req.user.email, 'logout');

        res
          .clearCookie("isConnected")
          .cookie("isConnected", false)
          .status(200)
          .json({
            success: true,
          });
      }
    );
  }
}

async function start(req, res) {
  client.select(1);
  // await client.RPUSHX("tst", "start");
  await client.set(req.user.email,'start');
  return res.status(200).json({});
}

async function stop(req, res) {
  client.select(1);
  // await client.RPUSHX('tst', "stop");
  await client.set(req.user.email, "stop");
  return res.status(200).json({});
}

async function ready(req, res) {
  client.select(1);
  // await client.RPUSHX('tst', "ready");
  await client.set(req.user.email, "ready");
  return res.status(200).json({});
}

async function mission(req, res) {
  const flag = req.body.flag;

  // 미션 관련은 redis 1번 DB에서 관리
  await client.select(1);

  if (flag == "1") {
    // client.RPUSHX('tst', "mission");
    client.set(req.user.email, "mission");
    return res.status(200).json({
      email: req.user.email,
      mission: true,
    });
  } else {
    // client.RPUSHX('tst', "story");
    client.set(req.user.email, "story");
    return res.status(200).json({
      mission: false,
    });
  }
}

function getImage(req, res) {
  const newUrl = "/user/image.jpg?${Date.now()}"; // 새로운 url
  return res.status(200).json({
    url: newUrl
  });
}

exports.issue = issue;
exports.checkConnect = checkConnect;
exports.disconnect = disconnect;
exports.start = start;
exports.stop = stop;
exports.ready = ready;
exports.mission = mission;
exports.getImage = getImage;
