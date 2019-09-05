const {Topics} = require("../db/topics");
const {Articles} = require("../db/articles");
const {Users} = require("../db/user");

module.exports = {
  topics: {
    async get() {
      try {
        return await Topics.findAll();
      } catch (error) {
        return error;
      }
    },
    async post(body) { // 쓰기 한뒤 id 반환
      try {
        return await Topics.create({
          user_id: body.user_id,
          topic_text: body.topic_text,
          publish_allow: 0
        })
            .then(res => res.id)
            .catch((err) => console.log(err))
      } catch (error) {
        console.log(error);
      }
    },
    notAllowed: async function() {
      try {
        let result = await Topics.findAll({
          where: { publish_allow: 0 }
        });
        return result;
      } catch (error) {
        return error;
      }
    },
    confirmAllow: async function(body) {
      try {
        console.log(body.id);
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
        return await Topics.findOne({where: {topic_text}}).then(
          res => res.dataValues.id
        ).catch((err) => null)
      } catch (error) {
        console.log(error)
      }
    },
  },
  users: {
    async get() {
      try {
        const result = await Users.findAll();
        return result;
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
            password: body.password,
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
        return await Users.findOne({where: {email}}).then(
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
            article_stash: false,
            publish_status: "public"
          }
        }); // TODO Read 테이블 완성되면 추가적으로 더 필터링 하는 로직 추가
        const index = Math.floor(Math.random() * result.length);
        return result[index];
      } catch (error) {
        return error;
      }
    },
    async post(body, tagArr) {
      try {
        console.log("여기@@@@@@@@@@@@@@@@@");
        const insertData = {
          topic_id: body.topic_id,
          user_id: body.user_id,
          topic_text: body.topic_text,
          title: body.title,
          article_text: body.article_text,
          burn_date: body.burn_date,
          will_public_at: body.will_public_at,
          publish_status: body.publish_status,
          article_stash: body.article_stash,
          tags_1: tagArr[0],
          tags_2: tagArr[1],
          tags_3: tagArr[2]
        };
        return await Articles.create(insertData)
            .catch(err => console.log(err)
        );
      } catch (error) {
        return error;
      }
    }
  },
  tags: {
    get: async function() {
      try {
        let arr = [];
        let result = await Articles.findAll({
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
  }
};
