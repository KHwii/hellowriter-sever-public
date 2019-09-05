let controller = require("./controller/controller");
let router = require("express").Router();
let cors = require("cors");

router.post("/signup", controller.users.post);
router.post("/signup/email", controller.users.checkMail);

router.get("/topics", cors(), controller.topics.get);
router.post("/topics", controller.topics.post);
router.get("/topics/notAllowed", cors(), controller.topics.notAllowed);
router.post("/topics/confirmAllow", controller.topics.confirmAllow);

router.get("/article/random", cors(), controller.articles.getArticleRandom);
router.post("/article", controller.articles.post);

router.get("/tags", cors(), controller.tags.get);

module.exports = router;
