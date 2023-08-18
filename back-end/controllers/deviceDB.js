const { User } = require("../models/users.js");
const { client } = require("../server.js");
const otpGenerator = require("otp-generator");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

let OTP = "0000";

// 서버에 저장된 파일을 지우는 함수
const delDir = (dir) => {
  fs.unlink(dir, (err) => {
    console.log(err);
  });
};

// Redis애 발급된 OTP를 저장하는 함수
async function issue(req, res) {
  const { email } = req.user;
  
  // 숫자로만 구성된 6자리 OTP 생성
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  OTP = otp;

  await client.select(0);
  client.set(otp, email);
  client.expire(otp, 190); // 입력시간을 고려하여 3분 10초 설정

  res.status(200).json({
    otp: otp,
  });
}

// 기기 연결 여부 확인
async function checkConnect(req, res) {
  //  기기에 대기중이라는 명령 전송
  await client.select(1);
  client.set(req.user.email, "ready");

  // 기기가 otp입력하면 올바른 OTP를 이 입력했는지 판단
  await client.select(0);
  const flag = await client.get(OTP);


  if (flag == "true") {
    User.findOneAndUpdate({ _id: req.user._id }, { isConnected: true }, (err, user) => {
        if (err) {
          return res.json({ err });
        }
        client.del(OTP);
        res.cookie("isConnected", user.isConnected).status(200).json({});
      });
  } else {
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) {
         return res.json({ err });
      }
      res.cookie("isConnected", user.isConnected).status(200).json({});
    });
  }
}

// 기기연결 해제
async function disconnect(req, res) {  
  // connect@test.com 계정 기기연결 해지 예외 설정
  if (req.user.email == "connect@test.com") {
    return res.status(200).json({
      success: true,
    });
  }

  await client.select(1);
  User.findOneAndUpdate({ _id: req.user._id }, { isConnected: false }, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        err,
      });
    }

    // 기기에 기기연결 해제 명령어 전송
    client.set(req.user.email, "logout");

    res.clearCookie("isConnected").cookie("isConnected", false).status(200).json({ success: true });
  });
}

// 기기에 카메라 시작 명령어 전송
async function start(req, res) {
  await client.select(1);
  await client.set(req.user.email, "start");
  return res.status(200).json({});
}

// 기기에 카메라 정지 명령 전송
async function stop(req, res) {
  await client.select(1);
  await client.set(req.user.email, "stop");

  // 저장된 캐릭터의 관절좌표 제거
  await client.select(3);
  await client.del(req.user.email);

  return res.status(200).json({});
}

// 기기에 대기 명령 전송
async function ready(req, res) {
  await client.select(1);
  await client.set(req.user.email, "ready");

  // 저장된 캡처 이미지 제거
  delDir("./user/" + req.user.email + "/image.jpg");
  delDir("./user/" + req.user.email + "/assemble.png");

  return res.status(200).json({});
}

// 책장에서 파일정리 명령어 전송
async function booksready(req, res) {
  await client.select(1);
  await client.set(req.user.email, "ready");

  // 저장된 캡처 이미지 및 변환된 캐릭터이미지 제거
  delDir("./user/" + req.user.email + "/image.jpg");
  delDir("./user/" + req.user.email + "/assemble.png");
  delDir("./user/" + req.user.email + "/character.png");
  delDir("./user/" + req.user.email + "/character_rmbg.png");

  return res.status(200).json({});
}

// 동화 페이지 별 미션 여부 명령어 전송
async function mission(req, res) {
  const flag = req.body.flag;

  await client.select(1);

  if ((await client.TYPE(req.user.email)) !== "list") {
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

// 캡처한 이미지 다운로드 함수
async function downloadImage(url, filename, email) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageData = Buffer.from(response.data, "binary");

    // 이미지를 저장할 경로 설정 (현재 디렉토리 기준)
    // const imagePath = path.join('dir','..', '/user' ,email, filename); // local
    const imagePath = path.join("/server/user", email, filename); // 배포

    // 파일 저장
    fs.writeFileSync(imagePath, imageData);
  } catch (error) {
    console.error(error.message);
  }
}

// 캡처한 이미지 저장
function capture(req, res) {
  const imgUrl = req.body.camUrl;
  const email = req.user.email;

  // downloadImage("http://localhost:3000" + imgUrl, `character.png`, email) // local
  downloadImage("https://i9c102.p.ssafy.io" + imgUrl, `character.png`, email); // 배포

  return res.status(200).json({});
}

// 기기에서 전달 받은 캐릭터 위치 계산 
async function position(req, res) {
  const user = req.user.email;

  await client.select(4);
  const type = await client.type(user);

  let x_diff = 0;
  let y_diff = 0;
  let left_x = 0;
  let left_y = 0;
  let right_x = 0;
  let right_y = 0;

  if (type === "list") {
    if ((await client.LLEN(user)) < 6) {
      x_diff = 0;
      y_diff = 0;
      left_x = 0;
      left_y = 0;
      right_x = 0;
      right_y = 0;
    } else {
      let diff = await client.lRange(user, 0, 6);
      x_diff = diff[0];
      y_diff = diff[1];
      left_x = diff[2];
      left_y = diff[3];
      right_x = diff[4];
      right_y = diff[5];
      for (let i = 0; i < 6; i++) {
        await client.lPop(user);
      }
    }
  }

  return res.status(200).json({
    email: user,
    x_diff: x_diff,
    y_diff: y_diff,
    left_x: left_x,
    left_y: left_y,
    right_x: right_x,
    right_y: right_y,
  });
}

// 기기에서 시용자 정보 조회
async function mail(req, res) {
  const user = req.user.email;

  return res.status(200).json({
    email: user,
  });
}

// 포지션위치 정보 초기화
async function cleardiff(req, res) {
  const user = req.user.email;

  await client.select(4);
  client.del(user);

  return res.status(200).json({
    email: user,
  });
}

// 캐릭터 관절좌표 초기화
async function clearcord(req, res) {
  const user = req.user.email;

  await client.select(3);
  client.del(user);

  return res.status(200).json({
    email: user,
  });
}

exports.issue = issue;
exports.checkConnect = checkConnect;
exports.disconnect = disconnect;
exports.start = start;
exports.stop = stop;
exports.ready = ready;
exports.booksready = booksready;
exports.mission = mission;
exports.capture = capture;
exports.position = position;
exports.mail = mail;
exports.cleardiff = cleardiff;
exports.clearcord = clearcord;
