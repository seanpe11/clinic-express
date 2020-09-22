import axios from 'axios';

const url = 'http://localhost:5000/api/login';

class LoginService {
  static login(body) {
    return new Promise((resolve, reject) => {
      axios.post(url, body)
        .then((res) => {
          const { data } = res;
          /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
          // resolve(
          //   data.map((patient) => ({
          //     ...patient,
          //     link: `/patients/envelope/${patient._id}`,
          //   })),
          // );
          console.log(data);
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('isAdmin', data.isAdmin);
          localStorage.setItem('fullname', `${data.first_name} ${data.last_name}`);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default LoginService;
