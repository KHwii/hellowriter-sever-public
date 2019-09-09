const models = require("../models/models");
const {
  getTags3,
  hashPassword,
  makeAccessJWToken,
  makeRefreshJWToken,
  isFulfilled,
  isBunrnInMonth
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
        if (result) {
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
      console.log(req.body, "사인테스트");
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
          console.log("세션 없는데로그인이 아닌데 로그인 요청했음");
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
    async getHotTitle(req, res) {
      try {
        const result = await models.articles.getRecentArtTitle();
        const myArticle = await models.articles.getAllArticleById(
          req.session.user.id
        );
        const reduced = myArticle.reduce(
          (acc, cur) => {
            if (isBunrnInMonth(cur.burn_date)) {
              acc.myBurning++;
              console.log(acc.myBurning);
            }
            if (!isFulfilled(cur.will_public_at)) {
              acc.myTimecapsule++;
              console.log(acc.myTimecapsule);
            }
            return acc;
          },
          { myBurning: 0, myTimecapsule: 0 }
        );
        const topicUsedCount = await models.articles.countAricleByUsersTopic(
          req.session.user.id
        );
        const data = {
          data: result,
          burning: reduced.myBurning,
          timecapsule: reduced.myTimecapsule,
          topicRefCount: topicUsedCount,
          success: true
        };
        res.status(200).send(data);
      } catch (e) {
        res.status(400).send({ success: false });
        console.log(e);
      }
    },
    async getMyInfo(req, res) {
      try {
        const result = await models.articles.getAllArticleById(
          req.session.user.id
        );
        let counter = 0;
        const now = new Date();
        result.forEach(e => {
          if (e.will_public_at - now <= 0) {
            counter++;
          }
        });
        const result2 = await models.articles.countAricleByUsersTopic(
          req.session.user.id
        );
        const data = {
          total: result.length,
          timecapsule: counter,
          topic: result2
        };
        res.status(200).send(data);
      } catch (e) {
        res.status(400).send({ success: false });
        console.log(e);
      }
    },
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
        console.log(req.body, "잘 가지고 왔니~1111@@@@@@@@@@");
        const result = await models.reads.post(
          req.body.rating,
          req.body.user_id,
          req.body.article_id
        );
        if (result) {
          res.status(200).send({ success: true });
        } else {
          res.status(400).send({ success: false });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  app: {
    getAppInfo: async (req, res) => {
      try {
        const data = {
          total: await models.articles.count(),
          topics: await models.topics.count(),
          users: await models.users.count(),
          success: true
        };
        res.status(200).send(data);
      } catch (err) {
        res.status(400).send({ success: false });
        console.log(err);
      }
    }
  }
};
