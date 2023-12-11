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
    .catch((error) => console.error("Error:", error));
};

userLoginBtn.addEventListener("click", login);
