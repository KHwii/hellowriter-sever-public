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
        if (req.query.word) {
          const article = await models.articles.getArticleByWord(
            req.query.word
          );
          res.status(200).send(article);
        } else {
          const result = await models.topics.get();
          res.status(200).send(result);
        }
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
    async notAllowed(req, res) {
      try {
        let result = await models.topics.notAllowed();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    async confirmAllow(req, res) {
      try {
        let result = await models.topics.confirmAllow(req.body);
        if (result) {
          res.status(200).send(result);
        }
      } catch (error) {
        res.status(400).send(error);
      }
    },
    async random(req, res) {
      try {
        let result = await models.topics.random();
        console.log("!!!!!", result);
        res.status(200).send(JSON.stringify(result));
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
        req.session.user = queryResult;
        console.log(req.session.user.email, "님 정보 확인했습니다.");
        res.status(200).send({
          success: true,
          accessToken,
          refreshToken,
          id: queryResult.id
        });
      } else {
        res.status(200).send({ success: false });
      }
    },
    async signOut(req, res) {
      try {
        if (req.session.user) {
          console.log("로그아웃", req.session.user);
          req.session.destroy();
          res.status(200).send({ success: true });
        } else {
          console.log("잘못된 접근");
          res.status(400).send({ success: false });
        }
      } catch (e) {
        console.log(e);
      }
    },
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
        // req.body.user_id = await models.users.getUserId(req.body.currentUserId);
        req.body.topic_id = await models.topics.getTopicId(req.body.topic_text);
        req.body.user_id = req.body.currentUserId;
        req.body.article_text = req.body.text;

        if (req.body.topic_id === null) {
          req.body.topic_id = await models.topics.post({
            topic_text: req.body.topic_text,
            user_id: req.body.currentUserId
          });
        }
        const topTags = getTags3(String(req.body.text));
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
    async get(req, res) {
      try {
        let result = await models.tags.get();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  },
  reads: {
    post: async (req, res) => {
      try {
        console.log(req.user_id, "잘 가지고 왔니~1111");
        const result = await models.reads.post(
          req.body.rating,
          req.body.user_id,
          req.body.article_id
        );
        console.log(result, "잘 가지고 왔니~22222");
        if (result) {
          res.status(200).send({ success: true });
        } else {
          res.status(400).send({ success: false });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};

// POST /read
// 현재 읽고 있는 글 (state에 저장된) 평가 내용 저장
// {raiting, ariticle_id, email}