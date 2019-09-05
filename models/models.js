let Topics = require("../db/topics").Topics;
let Articles = require("../db/articles").Articles;
let Users = require("../db/user").Users;

module.exports = {
  topics: {
    get: async function() {
      try {
        let result = await Topics.findAll();
        return result;
      } catch (error) {
        return error;
      }
    },
    post: async function(body) {
      try {
        await Topics.create({
          user_id: body.user_id,
          topic_text: body.topic_text,
          publish_allow: 0
        }).then(res => {
          console.log(body, res, "이거 봐야해요!@__@_@_@_@_@_@_@");
          return res.topics.dataValues.id;
        });
      } catch (error) {
        console.log(
          "----------------------------------------------여기서 잡히나요??",
          error
        );
        return error;
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
    getTopicId: async function(topic_text) {
      try {
        return await Topics.findOne({ where: { topic_text: topic_text } }).then(
          res => res.dataValues.id
        );
      } catch (error) {
        return error;
      }
    }
  },
  users: {
    get: async function() {
      try {
        let result = await Users.findAll();
        return result;
      } catch (error) {
        return error;
      }
    },
    post: async function(body) {
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
    checkMail: async function(body) {
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
    getUserId: async function(email) {
      try {
        return await Users.findOne({ where: { email: email } }).then(
          res => res.dataValues.id
        );
      } catch (error) {
        return error;
      }
    }
  },
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  articles: {
    getArticleRandom: async function() {
      try {
        let result = await Articles.findAll({
          where: {
            article_stash: false,
            publish_status: "public"
          }
        }); // TODO Read 테이블 완성되면 추가적으로 더 필터링 하는 로직 추가
        let index = Math.floor(Math.random() * result.length);
        return result[index];
      } catch (error) {
        return error;
      }
    },
    post: async function(body, tagArr) {
      try {
        let find_topic_id_result = await Topics.findOne({
          where: { topic_text: body.topic_text }
        }).catch(err => console.log(err, "ㅍ_ㅍ"));
        console.log("여기@@@@@@@@@@@@@@@@@");
        let insertData = {
          topic_id: find_topic_id_result[0].user.dataValues.id,
          user_id: find_user_id_result[0].id,
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
        let result = await Articles.create(insertData).catch(err =>
          console.log(err, "본문 인서트 중 에러다 이억건.!!")
        );
        return result;
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
