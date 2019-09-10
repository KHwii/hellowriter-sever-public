const crypto = require("crypto");
const JWT = require("jsonwebtoken");
const { jwtSalt } = require("../config/secret");

module.exports.getTags3 = string => {
  const myObj = {};
  const workArr = string.split(" ");
  for (let i in workArr) {
    const word = getFinedWord(workArr[i]);
    if (myObj[word] === undefined) {
      myObj[word] = 1;
    } else {
      myObj[word]++;
    }
  }
  const returnArr = [];

  for (let j = 0; j < 3; j++) {
    let Counter = 0;
    let bestWord = "";

    for (let i in myObj) {
      if (myObj[i] >= Counter) {
        bestWord = i;
        Counter = myObj[i];
      }
    }
    delete myObj[bestWord];
    returnArr[j] = bestWord;
  }
  return returnArr;

  function getFinedWord(char) {
    const lastArr1 = ["은", "는", "가", "이", "을", "를"];
    const lastArr2 = ["이다", "했다", "왔다", "다며", "에서"];
    const lastArr4 = ["들로부터", "그러면서"];
    if (lastArr1.includes(char.slice(-1))) {
      // console.log(char, "=>", char.slice(0, -1))
      return char.slice(0, -1);
    }
    if (lastArr2.includes(char.slice(-2))) {
      // console.log(char, "=>", char.slice(0, -2))
      return char.slice(0, -2);
    }
    if (lastArr4.includes(char.slice(-4))) {
      // console.log(char, "=>", char.slice(0, -4));
      return char.slice(0, -4);
    }
    return char;
  }
};
// let testText = `총학은 오는 5일 오전에는 행정관 앞에서 조 후보자의 사퇴 촉구를 위한 기자회견도 개최할 예정이다.
// 그러면서 “2일 진행된 조 후보자 기자간담회를 비롯해 추후 정치권의 상황 변화 등을 자세히 주시하며 향후 대응을 논의할 것”이라며
// “민주적이고 합리적인 의사결정을 위해 최선의 노력을 다하겠다”고 전했다. 총학이 조 후보자를 규탄하며 촛불집회를 연 것은
// 지난달 23일 개인 단위의 학생들로부터 1차 촛불집회를 시작했다. 이어 지난달 28일 2차 촛불집회를 진행, 전날 운영위원회 임시회의를
// 마친 후 3차 촛불 집회 개최에 대한 의견을 모았다. 한편 조 후보자는 지난 2일 12시간에 이르는 ‘대국민 기자간담회’를 통해
// 딸 입시·장학금 의혹 등에 대해 입장을 밝혔지만, 서울대 온라인 커뮤티니에서는 의혹이 풀리지 않았다며 비판적 반응이 나왔다.`;
// console.log(this.getTags3(testText));

// exports.makeTestAccessJWToken = userid => {
//   const payload = {
//     iss: "hello-writer",
//     sub: "AccessToken",
//     aud: userid,
//     shortly: true
//   };
//   return JWT.sign(payload, jwtSalt, { expiresIn: 999999999999 });
// };
//
// exports.makeRefreshJWToken = userid => {
//   const payload = {
//     iss: "hello-writer",
//     sub: "refreshToken",
//     aud: userid,
//     shortly: true
//   };
//   return JWT.sign(payload, jwtSalt, { expiresIn: 999999999999 });
// };
//
// console.log(this.makeTestAccessJWToken("admin@admin.com"));
// console.log(this.makeRefreshJWToken("test@test.com"));

module.exports.hashPassword = string => {
  const shasum = crypto.createHash("sha1");
  shasum.update(String(string) + jwtSalt);
  return shasum.digest("hex");
};

exports.makeAccessJWToken = userid => {
  const payload = {
    iss: "hello-writer",
    sub: "AccessToken",
    aud: userid,
    shortly: true
  };
  return JWT.sign(payload, jwtSalt, { expiresIn: "7D" });
};

exports.makeRefreshJWToken = userid => {
  const payload = {
    iss: "hello-writer",
    sub: "refreshToken",
    aud: userid,
    shortly: true
  };
  return JWT.sign(payload, jwtSalt, { expiresIn: "10D" });
};

exports.verifyToken = token => {
  return new Promise(resolve => {
    JWT.verify(token, jwtSalt, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        console.log("** 해독 완료 **");
        resolve(decoded);
      }
    });
  });
};

exports.isLoggedIn = req => {
  return req.session ? !!req.session.user : false;
};

exports.isFulfilled = date => {
  if (date - new Date() < 0) {
    return true;
  } else {
    return false;
  }
};
exports.isBunrnInMonth = date => {
  if (date - 1000 * 60 * 60 - new Date() > 0) {
    return false;
  } else {
    return true;
  }
};