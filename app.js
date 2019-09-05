const express = require("express");
const cors = require("cors");
const router = require("./routes.js");

const app = express();
process.env.NODE_ENV = "development";
// 배포하기 전에 다음 주석을 풀어주세요
// process.env.NODE_ENV = 'production';

// 아래 require를 통해 글로벌객체에 global.gconfig 으로 사용할 수 있는 전역정보가 등록 됩니다.
require("./config/config.js");
// console.log(global.gConfig,' gConfig 확인');

//DB 초기화
require("./db/db");

app.use(express.json());
app.set("port", global.gConfig.node_port);
app.use(cors({ credentials: true, origin: "*" }));

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));

// 기본 주소 라우팅
app.use("/", router);
