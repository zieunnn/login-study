"use strict";

const UserStorage = require("../../models/UserStorage");

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
    const users = UserStorage.getUsers("id", "pw");

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
