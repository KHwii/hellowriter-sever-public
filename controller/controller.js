let models = require("../models");

module.exports = {
  topics: {
    get: async function(req, res) {
      try {
        let result = models.topics.get();
        res.send(result);
      } catch (error) {
        res.send(error);
      }
    }
  }
};
