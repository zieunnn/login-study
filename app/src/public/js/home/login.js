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

  fatch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
};

userLoginBtn.addEventListener("click", login);
