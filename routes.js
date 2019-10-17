const router = require("express").Router();
const { checkToken } = require("./middleware");
const controller = require("./controller/controller");

router.post("/signin", controller.users.signin);
router.get("/signout", controller.users.signOut);
router.post("/signup", controller.users.post);
router.post("/signup/email", controller.users.checkMail);

router.get("/topics", checkToken, controller.topics.get);
router.get("/topics/random", checkToken, controller.topics.random);
router.post("/topics", checkToken, controller.topics.post);

router.get("/topics/notAllowed", checkToken, controller.topics.notAllowed);
router.post("/topics/confirmAllow", checkToken, controller.topics.confirmAllow);

router.get("/article/random", checkToken, controller.articles.getArticleRandom);
router.post("/article", checkToken, controller.articles.post);
router.get("/article/hot", checkToken, controller.articles.getHotTitle);

router.get("/tags", checkToken, controller.tags.get);

router.post("/read", checkToken, controller.reads.post);

router.get("/user/article", checkToken, controller.articles.getMyInfo);
router.get("/app/info", checkToken, controller.app.getAppInfo);

setTimeout(() => {
  setInterval(controller.app.burnSchedule.bind(this), 5000);
  console.log("인터벌 작업 시작");
}, 150000);
module.exports = router;
