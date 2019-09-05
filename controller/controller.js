let models = require("../models/models");
let getTags3 = require("../util/uility").getTags3;

module.exports = {
  topics: {
    get: async function(req, res) {
      try {
        let result = await models.topics.get();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    post: async function(req, res) {
      try {
        let result = await models.topics.post(req.body);
        if (result.dataValues) {
          res.status(200).send("ok");
        }
      } catch (error) {
        res.status(400).send(error);
      }
    },
    notAllowed: async function(req, res) {
      try {
        let result = await models.topics.notAllowed();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    confirmAllow: async function(req, res) {
      try {
        let result = await models.topics.confirmAllow(req.body);
        if (result) {
          res.status(200).send(result);
        }
      } catch (error) {
        res.status(400).send(error);
      }
    }
  },
  users: {
    get: async function(req, res) {
      try {
        let result = await models.users.get();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    post: async function(req, res) {
      if (req.url === "/signup" && req.method === "POST") {
        let queryResult = await models.users.post(req.body);
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
    },
    checkMail: async function(req, res) {
      try {
        let queryResult = await models.users.checkMail(req.body);
        if (queryResult.length === 0) {
          res.send(200, { duplicated: false });
        } else if (queryResult[0]) {
          res.send(200, { duplicated: true });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  articles: {
    getArticleRandom: async function(req, res) {
      try {
        let result = await models.articles.getArticleRandom(req.body);
        console.log(result);
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    post: async function(req, res) {
      try {
        req.body.user_id = await models.users.getUserId(req.body.email);
        console.log(req.body.isCustomIssue, "커스텀?");
        if (req.body.isCustomIssue === true) {
          let param = {
            topic_text: req.body.topic_text,
            user_id: req.body.user_id
          };
          let queryResult = await models.topics.post(param);
          console.log(queryResult, "토픽 인풋 결과");
        } else {
          console.log("예열 작업", req.body.topic_text);
          let temp = await models.topics.getTopicId(req.body.topic_text);
          console.log(temp);
          // req.body.topic_id
        }
        let topTags = getTags3(String(req.body.article_text));
        console.log(req.body, topTags, "최종바디");
        let result = await models.articles.post(req.body, topTags);
        if (result.dataValues) {
          console.log("잘했어!");
          res.status(200).send({ success: true });
        } else {
          console.log(result, "NOT GOOD");
        }
      } catch (error) {
        console.log(error, "못했어!");
        res.status(400).send({ success: false });
      }
    }
  },
  tags: {
    get: async function(req, res) {
      try {
        let result = await models.tags.get();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }
};
