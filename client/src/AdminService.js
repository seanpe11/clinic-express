import axios from 'axios';

const url = 'api/users';

class AdminService {
  static getUsers() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(url)
          .then((res) => {
            const { data } = res;
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static addUser(userInfo) {
    return new Promise((resolve, reject) => {
      try {
        axios.post(url, userInfo)
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static editUser(userInfo) {
    return new Promise((resolve, reject) => {
      try {
        axios.put(url, userInfo)
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static editPassword(userPwd) {
    return new Promise((resolve, reject) => {
      try {
        axios.put(`${url}/password`, userPwd)
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      try {
        axios.delete(`${url}/${userId}`)
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AdminService;
