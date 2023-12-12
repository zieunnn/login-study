"use strict";

const fs = require("fs").promises;

// 사용자 정보 조회
class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, psword, name]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  // 특정 필드만 가져오거나 전체 사용자 정보 조회
  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;

    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  // 모든 사용자 정보 불러오기
  static async getUsers(isAll, ...fields) {
    try {
      const data = await fs.readFile("src/db/study/users.json", "utf-8");
      return this.#getUsers(data, isAll, fields);
    } catch (error) {
      console.error(error);
      throw error; // 에러 전파
    }
  }

  // 특정 사용자 정보 불러오기
  static async getUserInfo(id) {
    try {
      const data = await fs.readFile("src/db/study/users.json", "utf-8");
      return this.#getUserInfo(data, id);
    } catch (error) {
      console.error(error);
      throw error; // 에러 전파
    }
  }

  // 사용자 정보 저장
  static async save(userValue) {
    try {
      const users = await this.getUsers(true);

      // 중복된 아이디 확인
      if (users.id.includes(userValue.userId)) {
        throw new Error("이미 존재하는 아이디입니다.");
      }

      // 필수 필드가 모두 존재하는지 확인
      if (userValue.userId && userValue.userName && userValue.userPw) {
        users.id.push(userValue.userId);
        users.name.push(userValue.userName);
        users.pw.push(userValue.userPw);

        // 업데이트된 사용자 정보를 'users.json' 파일에 쓰기
        await fs.writeFile("src/db/study/users.json", JSON.stringify(users));

        return { success: true };
      } else {
        throw new Error(
          "유효하지 않은 사용자 정보입니다. 필수 필드를 모두 제공해주세요."
        );
      }
    } catch (error) {
      console.error(error);
      throw error; // 에러 전파
    }
  }
}

module.exports = UserStorage;
