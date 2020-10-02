import axios from 'axios';

const url = 'api/visits';

class VisitService {
  static createVisit(body) {
    return axios.post(url, body);
  }

  static getVisitDetails(id) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${url}/${id}`)
          .then((res) => {
            const { data } = res;
            resolve(data);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  // TODO: Add update visit @Sean
  static updateVisit(id, data) {
    return new Promise((resolve, reject) => {
      try {
        axios.post(`${url}/${id}`, data)
          .then(() => {
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static deleteVisit(id) {
    return axios.delete(`${url}/${id}`);
  }

  static saveCanvas(id, data) {
    return new Promise((resolve, reject) => {
      try {
        axios.post(`${url}/${id}/saveCanvas`, data)
          .then(() => {
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default VisitService;
