const { User } = require("../models/users.js");
const { Device } = require("../models/device");
const { client } = require("../server.js");
const otpGenerator = require("otp-generator");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

let OTP = "0000";

async function issue(req, res) {
  const { email } = req.user;

  // Generate a random OTP using the otp-generator package
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  OTP = otp;

  await client.select(0);
  client.set(otp, email);
  client.expire(otp, 200); // 입력시간을 고려하여 3분 20초 설정

  res.status(200).json({
    // email: email,
    otp: otp,
  });
}

async function checkConnect(req, res) {
  await client.select(1);
  client.set(req.user.email, "ready");
  await client.select(0);
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

async function disconnect(req, res) {
  await client.select(1);
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
        client.set(req.user.email, "logout");

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
  await client.select(1);
  // await client.RPUSHX("tst", "start");
  await client.set(req.user.email, "start");
  return res.status(200).json({});
}

async function stop(req, res) {
  await client.select(1);
  // await client.RPUSHX('tst', "stop");
  await client.set(req.user.email, "stop");
  return res.status(200).json({});
}

async function ready(req, res) {
  await client.select(1);
  // await client.RPUSHX('tst', "ready");
  await client.set(req.user.email, "ready");
  return res.status(200).json({});
}

async function mission(req, res) {
  const flag = req.body.flag;

  await client.select(1);

  if (await client.TYPE(req.user.email) !== "list") {
    if (flag == "1") {
      client.set(req.user.email, "mission");
      return res.status(200).json({
        email: req.user.email,
        mission: true,
      });
    } else {
      client.set(req.user.email, "story");
      return res.status(200).json({
        mission: false,
      });
    }
  }
}

async function downloadImage(url, filename, email) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageData = Buffer.from(response.data, "binary");

    // 이미지를 저장할 경로 설정 (현재 디렉토리 기준)
    // const imagePath = path.join('dir','..', '/user' ,email, filename); // local
    const imagePath = path.join("/server/user", email, filename); // 배포
    // const imagePath = `/server/user/${email}/${filename}`; // 배포

    // 파일 저장
    fs.writeFileSync(imagePath, imageData);

    console.log(`이미지가 ${imagePath}에 저장되었습니다.`);
  } catch (error) {
    console.error("이미지 다운로드 에러:", error.message);
  }
}

function capture(req, res) {
  const imgUrl = req.body.camUrl;
  const email = req.user.email;

  console.log(imgUrl);

  // downloadImage("http://localhost:3000" + imgUrl, `character.png`, email) // local
  downloadImage("https://i9c102.p.ssafy.io" + imgUrl, `character.png`, email); // 배포

  return res.status(200).json({
    download: "succes",
  });
}

async function position(req, res) {
  const user = req.user.email;

  await client.select(4);
  const type = await client.type(user);

  let x_diff = 0;
  let y_diff = 0;
  console.log(type);

  if (type === "list") {
    if ((await client.LLEN(user)) <= 2) {
      x_diff = 0;
      y_diff = 0;
    } else {
      let diff = await client.lRange(user, 0, 1);
      x_diff = diff[0];
      y_diff = diff[1];
      console.log(x_diff);
      console.log(y_diff);
      await client.lPop(user);
      await client.lPop(user);
    }
  }

  return res.status(200).json({
    email: user,
    x_diff: x_diff,
    y_diff: y_diff,
  });
}

async function mail(req, res) {
  const user = req.user.email;

  return res.status(200).json({
    email: user
  });
}

exports.issue = issue;
exports.checkConnect = checkConnect;
exports.disconnect = disconnect;
exports.start = start;
exports.stop = stop;
exports.ready = ready;
exports.mission = mission;
exports.capture = capture;
exports.position = position;
exports.mail = mail;
