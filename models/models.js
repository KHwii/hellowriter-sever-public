let Topics = require("../db/topics").Topics;
let Users = require("../db/user").User;
let Articles = require("../db/articles").Articles;

module.exports = {
  topics: {
    get: async function () {
      try {
        let result = await Topics.findAll();
        return result;
      } catch (error) {
        return error;
      }
    },
    post: async function (body) {
      try {
        let result = await Topics.create({
          user_id: body.user_id,
          topic_text: body.topic_text,
          publish_allow: 0
        });
        return result;
      } catch (error) {
        return error;
      }
    },
    test: async function() {
      try {
        let result = await Topics.findAll();
        return result;
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
        let result = await Users.create({
          email: body.email,
          password: body.password,
          nickname: body.nickname
        });
        return result;
      } catch (error) {
        return error;
      }
    }
  },
  articles: {
    getArticleRandom: async function () {
      try {
        let result = await Articles.findAll({
          where: {
            article_stash: false,
            publish_status: "public"
          }
        });// TODO Read 테이블 완성되면 추가적으로 더 필터링 하는 로직 추가
        let index = Math.floor(Math.random() * result.length);
        return result[index];
      } catch (error) {
        return error;
      }
    },
    post: async function (body) {
      try {
        let result = await Articles.create({
          topic_id: body.topic_id,
          user_id: body.user_id,
          topic_text: body.topic_text,
          title: body.title,
          article_text: body.article_text,
          burn_date: body.burn_date,
          will_public_at: body.will_public_at,
          publish_status: body.publish_status,
          article_stash: body.article_stash
        });
        return result;
      } catch (error) {
        return error;
      }
    }

  }
};
