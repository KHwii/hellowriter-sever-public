const { Op } = require("sequelize");
const sequelize = require("../db/db");

const { Articles } = require("../db/articles");
const { Users } = require("../db/user");
const { Reads } = require("../db/read");
const { Topics } = require("../db/topics");
const { hashPassword } = require("../util/uility");

module.exports = {
  topics: {
    async count() {
      try {
        return await Topics.count();
      } catch (error) {
        return error;
      }
    },
    async get() {
      try {
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
    async count() {
      try {
        return await Users.count();
      } catch (error) {
        return error;
      }
    },
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
        console.log(error);
        return [];
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
    async burnFullfiledArticle() {
      try {
        return await Articles.destroy({
          where: {
            burn_date: { [Op.lt]: new Date() }
          },
          row: true
        });
      } catch (error) {
        return error;
      }
    },
    async getRecentArtTitle() {
      try {
        return await Articles.findAll({
          where: {
            article_stash: null,
            publish_status: { [Op.or]: ["public", "half"] },
            will_public_at: { [Op.lt]: new Date() }
          },
          order: [["createdAt", "DESC"], ["title", "ASC"]],
          attributes: ["title"],
          row: true
        }).then(res => res.map(e => e.title));
      } catch (error) {
        return error;
      }
    },
    async count() {
      try {
        return await Articles.count();
      } catch (error) {
        return error;
      }
    },
    async getAllArticleById(user_id) {
      try {
        return await Articles.findAll({
          where: { user_id: user_id },
          raw: true
        });
      } catch (e) {
        console.log(e);
      }
    },
    async countAricleByUsersTopic(userID) {
      try {
        return await sequelize
          .query(
            `SELECT COUNT(*) FROM articles as Art INNER JOIN topics as Top ON Art.topic_id =Top.id AND Top.user_id = ${userID}`,
            { plain: true }
          )
          .then(res => res["COUNT(*)"]);
      } catch (err) {
        console.log(err);
      }
    },
    async getArticleRandom(userID) {
      try {
        const result = await sequelize
          .query(
            `SELECT * from articles as A WHERE A.publish_status IN ("public", "half") AND id NOT IN (SELECT article_id FROM \`reads\` as R LEFT JOIN \`users\` as U ON R.user_id = U.id WHERE U.id = ${userID}) AND article_stash IS NULL`,
            { raw: true }
          )
          .then(res => {
            return res;
          });

        console.log(result[0].length, "몇개 나옴??");
        if (result[0].length === 0) {
          return 0;
        }
        const index = Math.floor(Math.random() * result[0].length);
        console.log(result[0][index], " 모델마지막");
        return result[0][index];
      } catch (error) {
        console.log(error, "새로짠 로직 에러");
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
        return await Reads.create({
          rating: rating,
          user_id: user_id,
          article_id: article_id
        })
          .then(res => {
            console.log(res);
            return res;
          })
          .catch(err => console.log(err));
      } catch (e) {
        console.log(e);
      }
    }
  }
};
