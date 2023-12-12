"use strict";

const userId = document.querySelector("#user-id"),
  userName = document.querySelector("#user-name"),
  userPw = document.querySelector("#user-pw"),
  userPwConfirm = document.querySelector("#user-pw-confirm"),
  userRegisterBtn = document.querySelector("#user-register-btn");

const register = (e) => {
  e.preventDefault();
  if (!userId.value) return alert("아이디를 입력하세요.");
  if (!userName.value) return alert("이름을 입력하세요.");
  if (!userPw.value) return alert("비밀번호를 입력하세요.");
  if (userPw.value !== userPwConfirm.value)
    return alert("비밀번호가 일치하지 않습니다.");

  const req = {
    userId: userId.value,
    userPw: userPw.value,
    userName: userName.value,
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        alert(res.msg);
      }
    })
    .catch(console.error("회원가입 중 에러 발생"));
};

userRegisterBtn.addEventListener("click", register);
