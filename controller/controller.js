const models = require("../models/models");
const {
  getTags3,
  hashPassword,
  makeAccessJWToken,
  makeRefreshJWToken
} = require("../util/uility");

module.exports = {
  topics: {
    async get(req, res) {
      try {
        const result = await models.topics.get();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    async post(req, res) {
      try {
        const result = await models.topics.post(req.body);
        if (result.dataValues) {
          res.status(200).send("ok");
        }
      } catch (error) {
        res.status(400).send(error);
      }
    },
    async test(req, res) {
      try {
        const result = await models.topics.test();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  },
  users: {
    async signin(req, res) {
      const queryResult = await models.users.getById(req.body.email);
      const decoded = await hashPassword(req.body.password);
      if (decoded === queryResult.password) {
        const accessToken = makeAccessJWToken(req.email);
        const refreshToken = makeRefreshJWToken(req.email);
        req.session.regenerate(() => {
          req.session.user = queryResult;
          console.log(req.session);
          res.cookie("testCookie", "123", {
            expire: new Date(Date.now() + 600)
          });
          res.status(200).send({
            success: true,
            accessToken,
            refreshToken,
            id: queryResult.id
          });
        });
      } else {
        res.status(200).send({ success: false });
      }
    },
    //  안쓰고 있음.
    // async get(req, res) {
    //   try {
    //     const result = await models.users.get();
    //     res.status(200).send(result);
    //   } catch (error) {
    //     res.status(400).send(error);
    //   }
    // },
    async post(req, res) {
      if (req.url === "/signup" && req.method === "POST") {
        const queryResult = await models.users.post(req.body);
        if (queryResult.duplicated === true) {
          res.send(
            400,
            `${queryResult.data.email} 님은 이미 가입된 상태였습니다. 잘못된 요청입니다.`
          );
        } else {
          res.send(200, `${queryResult.data.email} 님의 가입을 축합니다.`);
        }
      } else {
        res.send("처리되지 못한 요청");
      }
    },
    async checkMail(req, res) {
      try {
        const queryResult = await models.users.checkMail(req.body);
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
    async getArticleRandom(req, res) {
      try {
        const result = await models.articles.getArticleRandom(req.body);
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    async post(req, res) {
      try {
        req.body.user_id = await models.users.getUserId(req.body.email);
        req.body.topic_id = await models.topics.getTopicId(req.body.topic_text);

        if (req.body.topic_id === null) {
          req.body.topic_id = await models.topics.post({
            topic_text: req.body.topic_text,
            user_id: req.body.user_id
          });
        }
        const topTags = getTags3(String(req.body.article_text));
        const result = await models.articles.post(req.body, topTags);
        if (result.dataValues) {
          res.status(200).send({ success: true });
        }
      } catch (error) {
        console.log(error);
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
