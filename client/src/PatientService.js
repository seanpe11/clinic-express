import axios from 'axios';
import moment from 'moment';

const url = 'http://localhost:5000/api/patients';

class PatientService {
  static getPatients(search) {
    return new Promise((resolve, reject) => {
      try {
        let searchQuery = '';
        if (search !== '') searchQuery = `?s=${search}`;
        axios.get(url + searchQuery)
          .then((res) => {
            const { data } = res;
            /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
            resolve(
              data.map((patient) => ({
                ...patient,
                link: `/patients/envelope/${patient._id}`,
              })),
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

  static fetchPatientProfile(id) {
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${url}/${id}`)
          .then((res) => {
            const { data } = res;
            const { visits } = data;
            const { patient } = data;
            const resolveArray = visits.map((visit) => ({
              ...visit,
              date: moment(visit.createdAt).format('LLL'),
              link: `/patients/visits/${visit.patient}/${visit._id}`,
            }));
            const resolveObject = Object.assign(patient, {
              visits: resolveArray,
            });
            resolve(resolveObject);
          });
      } catch (err) {
        console.log(err);
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

export default PatientService;
