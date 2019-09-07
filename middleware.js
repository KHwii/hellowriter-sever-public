const { verifyToken, makeAccessJWToken } = require("./util/uility");

module.exports = {
  checkToken: async (req, res, next) => {
    const isValidAccessToken = await verifyToken(req.headers.accesstoken);
    if (isValidAccessToken) {
      // console.log(
      //   isValidAccessToken,
      //   req.session.user.email,
      //   "님 안녕하세요. (1차)"
      // );
      next();
    } else {
      const isValidRefreshToken = await verifyToken(req.headers.refreshtoken);
      if (isValidRefreshToken) {
        res.body.accessKey = makeAccessJWToken(req.session.id);
        // console.log(
        //   isValidRefreshToken,
        //   req.session.user.email,
        //   "님 안녕하세요. (2차)"
        // );
        next();
      } else {
        res
          .status(400)
          .send({ msg: "유효하지 않은 토큰입니다.", access: false });
      }
    }
  },
  userLogging: (req, res, next) => {
    if (req.session.view === undefined) {
      req.session.view = 1;
      console.log("첫 방문");
    } else {
      req.session.view++;
      // console.log(
      //   req.session.user.email,
      //   "님의 ",
      //   req.session.view,
      //   "번째 요청"
      // );
    }
    // console.log(
    //   req.path,
    //   req.method,
    //   " 요청 정보",
    //   req.session.view,
    //   "요청횟수"
    // );
    next();
  }
};

// exports.checkUser = (req, res, next) => {
//   if (!this.isLoggedIn(req)) {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// };
