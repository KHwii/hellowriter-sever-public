let controller = require("./controller");
let router = require("express").Router();
let cors = require("cors");

router.get("/topics/random", cors(), controller.topics.get);
