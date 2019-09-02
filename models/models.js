let Topics = require("../db/topics").Topics;

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
    }
  }
};
