let controller = require("./controller/controller");
let router = require("express").Router();
let cors = require("cors");

router.get("/topics", cors(), controller.topics.get);
router.post("/topics", controller.topics.post);
router.get("/test", cors(), controller.topics.test);

router.get("/signup", cors(), controller.users.get);
router.post("/signup", controller.users.post);

module.exports = router;
