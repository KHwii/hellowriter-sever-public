const { verifyToken, makeAccessJWToken } = require("./util/uility");

module.exports = {
  checkToken: async (req, res, next) => {
    const isValidAccessToken = await verifyToken(req.headers.accesstoken);
    if (isValidAccessToken) {
      next();
    } else {
      const isValidRefreshToken = await verifyToken(req.headers.refreshtoken);
      if (isValidRefreshToken) {
        res.body.accessKey = makeAccessJWToken(req.session.id);
        next();
      } else {
        res
          .status(400)
          .send({ msg: "유효하지 않은 토큰입니다.", access: false });
      }
    }
    throw new Error("여기 오면 안되요 당신 from 토큰검사");
  },
  userLogging: (req, res, next) => {
    if (req.session.user === undefined) {
      console.log(req.session, "세션 정보가 없는 유저");
      next();
    } else {
      console.log(req.session, "님이 활동중!");
      next();
    }
  }
};

// exports.checkUser = (req, res, next) => {
//   if (!this.isLoggedIn(req)) {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// };
