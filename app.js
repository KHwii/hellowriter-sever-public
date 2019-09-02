const express = require("express");
const cors = require("cors");

const app = express();
console.log("hello, writer.");
process.env.NODE_ENV = "development";
// 배포하기 전에 다음 주석을 풀어주세요
// process.env.NODE_ENV = 'production';

// 아래 require를 통해 글로벌객체에 global.gconfig 으로 사용할 수 있는 전역정보가 등록 됩니다.
require("./config/config.js");
// console.log(global.gConfig,' gConfig 확인');

//DB 초기화
require("./db/db");
const User = require("./db/user");

app.use(express.json());
app.set("port", global.gConfig.node_port);
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
app.options("*", cors());

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));

// 임시 구현, MVC 완성되면 다시 리팩토링
app.post("/signup", async (req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    let queryResult = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        password: req.body.password,
        nickname: req.body.nickname
      }
    })
      .then(([user, created]) => {
        return { data: user.get(), duplicated: !created };
      })
      .catch(err => console.log(err, "___ 에러 ___"));
    // console.log(queryResult, "꺼낸 결과");
    if (queryResult.duplicated === true) {
      res.send(
        400,
        queryResult.data.email +
          " 님은 이미 가입된 상태였습니다. 잘못된 요청입니다."
      );
    } else {
      res.send(200, queryResult.data.email + " 님의 가입을 축합니다.");
    }
  } else {
    res.send("처리되지 못한 요청");
  }
});

// 기본 주소 라우팅
let router = require("./routes.js");
app.use("/", router);
