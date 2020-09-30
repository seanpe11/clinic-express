import axios from 'axios';

const url = 'http://localhost:5000/api/billings';

class BillingService {
    static getService(search) {
        return new Promise((resolve, reject) => {
            try {
              let searchQuery = '';
              if (search !== '') searchQuery = `?s=${search}`;
              axios.get(url + searchQuery)
                .then((res) => {
                  const { data } = res;
                  resolve(
                    data.map((services) => (
                      {
                        ...service,
                        link: `/billing`,
                      }
                    )),
                  );
                });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
        }
      
        static createPatient(body) {
          return axios.post(url, body);
        }
      
        static updatePatient(id, body) {
          return new Promise((resolve, reject) => {
            try {
              axios.put(`${url}/${id}`, body)
                .then(() => {
                  resolve();
                });
            } catch (err) {
              reject(err);
            }
          });
    }

    static deletePatient(id) {
        return new Promise((resolve, reject) => {
          try {
            axios.delete(`${url}/${id}`)
              .then(() => {
                resolve();
              });
          } catch (err) {
            reject(err);
          }
        });
      }
}


export default BillingService;