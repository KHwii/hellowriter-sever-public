let controller = require("./controller/controller");
let router = require("express").Router();
let cors = require("cors");

router.get("/topics", cors(), controller.topics.get);
router.post("/topics", controller.topics.post);
router.get("/test", cors(), controller.topics.test);

router.get("/signup", cors(), controller.users.get);
router.post("/signup", controller.users.post);

router.get("/article/random", cors(), controller.articles.getArticleRandom);
router.post("/article", controller.articles.post);

module.exports = router;
