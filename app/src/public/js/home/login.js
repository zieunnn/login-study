"use strict";

const userId = document.querySelector("#userId"),
  userPw = document.querySelector("#userPw"),
  userLoginBtn = document.querySelector("#userLogin button[type=submit]");

const login = (e) => {
  e.preventDefault();
  const req = {
    userId: userId.value,
    userPw: userPw.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error("로그인 중 에러 발생"));
};

userLoginBtn.addEventListener("click", login);
