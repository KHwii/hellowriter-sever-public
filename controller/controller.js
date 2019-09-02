let models = require("../models/models");

module.exports = {
  topics: {
    get: async function(req, res) {
      try {
        let result = await models.topics.get();
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    post: async function(req, res) {
      try {
        let result = await models.topics.post(req.body);
        if (result.dataValues) {
          res.status(200).send("ok");
        }
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }
};
