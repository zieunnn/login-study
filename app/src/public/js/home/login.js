"use strict";

const userId = document.querySelector("#user-id"),
  userPw = document.querySelector("#user-pw"),
  userLoginBtn = document.querySelector("#user-login-btn");

const login = (e) => {
  e.preventDefault();
  if (!userId.value) return alert("아이디를 입력하세요.");
  if (!userPw.value) return alert("비밀번호를 입력하세요.");
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
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((error) => console.error("로그인 중 에러 발생", error));
};

userLoginBtn.addEventListener("click", login);
