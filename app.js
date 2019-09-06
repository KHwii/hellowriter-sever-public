const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParse = require("cookie-parser");
const { session_secret } = require("./config/secret");
const { userLogging } = require("./middleware");

const app = express();
module.exports.app = app;

process.env.NODE_ENV = "development";
// 배포하기 전에 다음 주석을 풀어주세요
// process.env.NODE_ENV = 'production';

// 아래 require를 통해 글로벌객체에 global.gconfig 으로 사용할 수 있는 전역정보가 등록 됩니다.
require("./config/config.js");
// console.log(global.gConfig,' gConfig 확인');

// DB 초기화
require("./db/db");

app.use(express.json());
app.set("port", global.gConfig.node_port);
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParse());
app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60, secure: false }
  })
);

app.use(userLogging);

//req.session.destroy();
app.listen(app.get("port"));
console.log("Listening on", app.get("port"));

const router = require("./routes.js");
// 기본 주소 라우팅
app.use("/", router);

// 잡히지 않은 에러를 잡습니다.
process.on("uncaughtException", err => {
  console.error(err, "############# 죽지마 서버야#########");
  process.exit(1);
});
