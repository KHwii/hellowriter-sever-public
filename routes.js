let controller = require("./controller/controller");
let router = require("express").Router();
let cors = require("cors");

router.get("/topics", cors(), controller.topics.get);
router.post("/topics", controller.topics.post);

module.exports = router;
