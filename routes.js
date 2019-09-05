const cors = require("cors");
const router = require("express").Router();
const controller = require("./controller/controller");

router.post("/signin", controller.users.signin);
router.post("/signup", controller.users.post);
router.post("/signup/email", controller.users.checkMail);

router.get("/topics", cors(), controller.topics.get);
router.post("/topics", controller.topics.post);
router.get("/test", cors(), controller.topics.test);

router.get("/article/random", cors(), controller.articles.getArticleRandom);
router.post("/article", controller.articles.post);

router.get("/tags", cors(), controller.tags.get);

module.exports = router;
