const router = require("express").Router();
const { checkToken } = require("./middleware");
const controller = require("./controller/controller");
console.log(checkToken);

router.post("/signin", controller.users.signin);
router.get("/signout", controller.users.signOut);
router.post("/signup", controller.users.post);
router.post("/signup/email", controller.users.checkMail);

router.get("/topics", checkToken, controller.topics.get);
router.post("/topics", checkToken, controller.topics.post);

router.get("/topics/notAllowed", checkToken, controller.topics.notAllowed);
router.post("/topics/confirmAllow", checkToken, controller.topics.confirmAllow);

router.get("/article/random", checkToken, controller.articles.getArticleRandom);
router.post("/article", checkToken, controller.articles.post);

router.get("/tags", checkToken, controller.tags.get);

router.post("/read", checkToken, controller.reads.post);

module.exports = router;
