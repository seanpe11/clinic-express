import axios from 'axios';

const url = 'http://localhost:5000/api/patients';

class PatientService {
  // Get All Patients
  static getPatients() {
    return axios.get(`${url}/testList`);
  }

  // Get Filtered Patients
}

export default PatientService;
