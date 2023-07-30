// MongoDB를 사용하며, 포트는 5000번을 사용

const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const { db } = require("./module/db");

db();

app.get("/", (req, res) => res.send("안녕하세요!"));

app.listen(port, () => console.log(`${port}번에 잘 접속했습니다.`));

// 유저 API 생성
const { User } = require("./models/User.js");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/register", (req, res) => {
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
});

app.post("/login", (req, res) => {
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
      user.generateToken((err, user) => {
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
});