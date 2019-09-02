let topics = require("../db/topics");

module.exports = {
  topics: {
    get: async function() {
      try {
        topics.sync();
        let result = topics.findAll();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
};
