const express = require("express");
const cors = require("cors");

const app = express();

process.env.NODE_ENV = 'development';
// uncomment below line to deploy or test our service on AWS
// process.env.NODE_ENV = 'production';

// 아래 require를 통해 글로벌객체에 global.gconfig 으로 사용할 수 있는 전역정보가 드록 됩니다.
require('./config/config.js');
// console.log(global.gConfig,' gConfig 확인');

app.use(express.json());
app.set("port", global.gConfig.node_port);
app.use(cors());
app.options("*", cors());

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));