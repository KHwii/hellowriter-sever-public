let Topics = require("../db/topics").Topics;
let Users = require("../db/user").User;

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
  }
};
