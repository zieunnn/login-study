"use strict";

const users = {
  id: ["1", "2", "3"],
  pw: ["1", "2", "3"],
};

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

const process = {
  login: (req, res) => {
    const userId = req.body.userId;
    const userPw = req.body.userPw;

    if (users.id.includes(userId)) {
      const idx = users.id.indexOf(userId);
      if (users.pw[idx] === userPw) {
        return res.json({ success: true, msg: "로그인 성공" });
      }
    }
    return res.json({ success: false, msg: "로그인 실패" });
  },
};

module.exports = {
  output,
  process,
};
