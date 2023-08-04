const { User } = require("../models/users.js");
const { smtpTransport } = require("../config/email.js");
const ejs = require("ejs");
const path = require("path");
var appDir = path.dirname(require.main.filename);
let verificationCodes = {};
const otpGenerator = require("otp-generator");

/* 회원가입 API */
function register(req, res) {
  // 회원가입할 때 필요한 정보들을
  // client에서 가져오면 그것들을 db에 넣는다.
  const user = new User(req.body);
  // 정보 저장, 에러 시 json 형식으로 전달
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
}

/* 아이디 중복 체크 API */
function idCheck(req, res) {
  // 데이터베이스 안에서 입력한 email찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.json({
        registerService: false,
        message: "중복된 이메일이 있습니다.",
      });
    } else {
      return res.json({
        registerService: true,
        message: "사용 가능한 이메일입니다.",
      });
    }
  });
}

/* 로그인 API */
function login(req, res) {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다!",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호가 맞다면 토큰을 생성
      user.generateToken(req.body.password, (err, user) => {
        if (err) return res.status(400).send(err);

        // 정상적이라면 토큰을 쿠키 혹은 로컬스토리지에 저장
        // 지금은 쿠키에 저장
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userid: user._id,
        });
      });
    });
  });
}

/* 인증 API */
function auth(req, res) {
  // 여기까지 미들웨어(auth.js)를 통과해 왔다는 이야기는 인증이 true
  // 클라이언트에게 유저 정보를 전달
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role == 0 ? false : true, // role이 0이면 일반 유저, 그외는 관리자
    isAuth: true,
    email: req.user.email,
    role: req.user.role,
  });
}

/* 로그아웃 API */
function logout(req, res) {
  // token을 삭제시킨다.
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", isConnected: false }, (err, user) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    // 쿠키삭제를 먼저 진행시켜서 로그아웃을 진행시킨다.
    return res.clearCookie("x_auth", "isConnected").status(200).send({
      success: true,
    });
  });
}

/* 이메일 인증 API */
function mail(req, res) {
  // OTP Generator를 활용해서 임의의 번호 생성
  const number = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  verificationCodes[req.body.email] = number;

  // 백엔드에서 파일을 바로 불러오는 것이 편해서
  // ejs파일 생성 및 연동시키기
  ejs.renderFile(
    appDir + "/templates/authMail.ejs",
    { authCode: number },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplate = data;
    }
  );

  // console.log(req.body.email);
  // console.log(number);

  let mailOptions = {
    from: "3BTI: 스케치북, 아이의 상상은 현실이 된다.",
    to: req.body.email,
    subject: "회원가입을 위한 인증번호를 입력해주세요.",
    html: emailTemplate,
  };

  // 입력한 아이디로 회원가입 인증번호 보내기
  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    res.json({
      message: "메일이 무사히 전송되었습니다.",
      number: number,
    });
    smtpTransport.close();
  });
}

/* 이메일 인증 코드 비교 API */
function checkVerificationCode(req, res) {
  // 클라이언트에서 보낸 인증 코드와 이메일을 가져옵니다.
  const { email, verificationCode } = req.body;

  // Get the verification code for this email
  const number = verificationCodes[email];

  // 사용자가 입력한 인증 코드와 서버에서 생성한 인증 코드를 비교합니다.
  if (number != verificationCode) {
    return res.json({
      success: false,
      message: "유효하지 않은 인증 코드입니다.",
    });
  }

  // 인증 코드가 일치하면 해당 이메일에 대한 인증 코드를 제거합니다.
  delete verificationCodes[email];

  return res.json({
    success: true,
    message: "인증이 완료되었습니다.",
  });
}

/* 임시비밀번호 발급 API */
function tempPassword(req, res) {
  const email = req.body.email;

  // 임시비밀번호는 특수문자를 제외한 무작위 조합
  const tempPassword = otpGenerator.generate(10, {
    specialChars: false,
  });

  ejs.renderFile(
    appDir + "/templates/tempPassword.ejs",
    { tempPassword: tempPassword },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplate = data;
    }
  );

  let mailOptions = {
    from: "3BTI: 스케치북, 아이의 상상은 현실이 된다.",
    to: email,
    subject: "임시비밀번호를 발급했습니다.",
    html: emailTemplate,
  };

  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    res.json({
      message: "메일이 무사히 전송되었습니다.",
      tempPassword: tempPassword,
    });
    smtpTransport.close();
  });

  // 데이터베이스에서 해당하는 email을 조회하여
  // 비밀번호를 임시비밀번호로 바꿔주고 바로 저장을 실행시킨다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        err,
      });
    }
    user.password = tempPassword;
    user.save();

    return res.status(200).send({
      success: true,
      message: "비밀번호 변경 완료!",
      password: user.password,
    });
  });
}

/* 비밀번호 변경 API */
function changePassword(req, res) {
  const prePassword = req.body.prePassword;
  const newPassword = req.body.newPassword;

  // 데이터베이스에서 고유번호를 찾아서 해당 아이디를 찾음
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        err,
      });
    }
    user.comparePassword(prePassword, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          message: "현재 비밀번호가 틀렸습니다.",
        });
      }
      // console.log(user.password)
      user.password = newPassword;
      user.save();

      return res.status(200).send({
        success: true,
        message: "비밀번호 변경 완료!",
      });
    });
  });
}

exports.register = register;
exports.idCheck = idCheck;
exports.login = login;
exports.auth = auth;
exports.logout = logout;
exports.mail = mail;
exports.checkVerificationCode = checkVerificationCode;
exports.tempPassword = tempPassword;
exports.changePassword = changePassword;
