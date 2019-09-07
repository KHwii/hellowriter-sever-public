const { Op } = require("sequelize");
const { Topics } = require("../db/topics");
const { Articles } = require("../db/articles");
const { Users } = require("../db/user");
const { Reads } = require("../db/read");
const { hashPassword } = require("../util/uility");

module.exports = {
  topics: {
    async get() {
      try {
        console.log("이거야??");
        return await Topics.findAll();
      } catch (error) {
        return error;
      }
    },
    async post(body) {
      // 쓰기 한뒤 id 반환
      try {
        return await Topics.create({
          user_id: body.user_id,
          topic_text: body.topic_text,
          publish_allow: 0
        })
          .then(res => res.id)
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    },
    async notAllowed() {
      try {
        const result = await Topics.findAll({
          where: { publish_allow: 0 }
        });
        return result;
      } catch (error) {
        return error;
      }
    },
    async confirmAllow(body) {
      try {
        let result = await Topics.update(
          {
            publish_allow: 1
          },
          { where: { id: body.id }, returning: true }
        );
        return result;
      } catch (error) {
        return error;
      }
    },
    async getTopicId(topic_text) {
      try {
        return await Topics.findOne({ where: { topic_text } })
          .then(res => res.dataValues.id)
          .catch(err => null);
      } catch (error) {
        console.log(error);
      }
    },
    async random() {
      try {
        let result = await Topics.findAll({
          attributes: ["topic_text"],
          where: { publish_allow: 1 }
        });
        const filteredResult = result.map(obj => obj.dataValues.topic_text);
        const random = Math.floor(Math.random() * filteredResult.length);
        console.log(filteredResult[random]);
        return filteredResult[random];
      } catch (error) {
        return error;
      }
    }
  },
  users: {
    async getById(email) {
      // 파인드 원은 테이블 이름없이 바로 쓸 수 있는 객체만 준다.
      try {
        return await Users.findOne({ where: { email } })
          .then(res => res.dataValues)
          .catch(err => console.log(err));
      } catch (error) {
        return error;
      }
    },
    async post(body) {
      try {
        return await Users.findOrCreate({
          where: {
            email: body.email
          },
          defaults: {
            password: hashPassword(body.password),
            nickname: body.nickname
          }
        }).then(([user, created]) => {
          return { data: user.get(), duplicated: !created };
        });
      } catch (error) {
        return error;
      }
    },
    async checkMail(body) {
      try {
        return await Users.findAll({
          where: {
            email: body.email
          }
        });
      } catch (error) {
        return error;
      }
    },
    async getUserId(email) {
      try {
        return await Users.findOne({ where: { email } }).then(
          res => res.dataValues.id
        );
      } catch (error) {
        return error;
      }
    }
  },
  articles: {
    async getArticleRandom() {
      try {
        let result = await Articles.findAll({
          where: {
            article_stash: null,
            publish_status: "public"
          }
        }); // TODO Read 테이블 완성되면 추가적으로 더 필터링 하는 로직 추가
        const index = Math.floor(Math.random() * result.length);
        console.log(result);
        return result[index];
      } catch (error) {
        return error;
      }
    },
    async post(body, tagArr) {
      try {
        const insertData = {
          topic_id: body.topic_id,
          user_id: body.user_id,
          topic_text: body.topic_text,
          title: body.title,
          article_text: body.article_text,
          burn_date: body.burnDate,
          will_public_at: body.will_public_at,
          publish_status: body.publish,
          article_stash: body.article_stash,
          tags_1: tagArr[0],
          tags_2: tagArr[1],
          tags_3: tagArr[2]
        };
        return await Articles.create(insertData).catch(err => console.log(err));
      } catch (error) {
        return error;
      }
    },
    async getArticleByWord(word) {
      try {
        console.log("??????", word);
        return await Articles.findAll({
          where: {
            [Op.or]: [
              {
                tags_1: {
                  [Op.like]: `%${word}%`
                }
              },
              {
                tags_2: {
                  [Op.like]: `%${word}%`
                }
              },
              {
                tags_3: {
                  [Op.like]: `%${word}%`
                }
              }
            ]
          }
        })
          .then(res => {
            const index = Math.floor(Math.random() * res.length);
            return res[index];
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        return error;
      }
    }
  },
  tags: {
    async get() {
      try {
        let arr = [];
        const result = await Articles.findAll({
          attributes: ["tags_1", "tags_2", "tags_3"]
        });
        await result.forEach(obj => {
          Object.values(obj.dataValues).forEach(el => {
            if (!arr.includes(el)) {
              arr.push(el);
            }
          });
        });
        return arr;
      } catch (error) {
        return error;
      }
    }
  },
  reads: {
    post: async (rating, user_id, article_id) => {
      try {
        console.log(rating, user_id, article_id, "있어?");
        return await Reads.create({
          rating: rating,
          user_id: user_id,
          article_id: article_id
        })
          .then(res => {
            console.log(res, "크레이트 결과~");
            return res;
          })
          .catch(err => console.log(err));
      } catch (e) {
        console.log(e);
      }
    }
  }
};
