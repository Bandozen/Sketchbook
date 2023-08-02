// 클라이언트 쿠키에서 토큰을 가져와 복호화한다.
// 그 다음 클라이언트의 토큰과 데이터베이스의 토큰이 일치하는지 확인한다.

const { User } = require("../models/users.js");
// const cookieParser = require("cookie-parser");

let Auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;

  // 토큰을 복호화한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { Auth };
