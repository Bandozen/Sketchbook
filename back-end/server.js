// 회원정보, 동화정보는 MongoDB를 사용
// OTP, 관절 포인트는 Redis를 사용

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
// const redis = require("redis");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

/* middlewares */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


/* PORT 지정 */
const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("안녕하세요!"));

/* Redis 연결 */
const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", () => console.log("Redis에 연결되었습니다."));

client.connect();

exports.client = client;

/* mongoDB 연결 */
const { dbConnect } = require("./modules/dbConnect");

dbConnect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`${PORT}번에 잘 접속했습니다.`);
      });
    } catch (error) {
      console.log("서버에 접속하지 못했습니다.");
    }
  })
  .catch((error) => {
    console.log("MongoDB에 연결되지 못했습니다");
  });

// userDB();
const userRouter = require("./routers/usersRouter.js");

app.use("/api/users", userRouter);

//deviceDB();
const deviceRouter = require("./routers/deviceRouter.js");

app.use("/api/devices", deviceRouter);
