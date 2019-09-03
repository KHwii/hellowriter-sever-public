let models = require("../models/models");

module.exports = {
  topics: {
    get: async function (req, res) {
      try {
        let result = await models.topics.get();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    post: async function (req, res) {
      try {
        let result = await models.topics.post(req.body);
        if (result.dataValues) {
          res.status(200).send("ok");
        }
      } catch (error) {
        res.status(400).send(error);
      }
    }
  },
  articles: {
    getArticleRandom: async function (req, res) {
      try {
        let result = await models.articles.getArticleRandom(req.body);
        console.log(result);
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    post: async function (req, res) {
      try {
        let result = await models.articles.post(req.body);
        if (result.dataValues) {
          res.status(200).send({success:true});
        }
      } catch (error) {
        res.status(400).send({success:false});
      }
    }
  },
  users: {
    post: async function (req, res) {
      if (req.url === "/signup" && req.method === "POST") {
        let queryResult = await models.users.post(req.body);
        console.log(queryResult,"이번에 나온 값!")
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
    }
  }
};