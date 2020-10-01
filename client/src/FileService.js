import axios from 'axios';

const url = 'http://localhost:5000/api/files';

class FileService {
  static getFiles(visitId) {
      return new Promise((resolve, reject) => {
        try {
          axios.get(`${url}/${visitId}`)
            .then((res) => {
              resolve(res);
            });
        } catch (err) {
          reject(err);
        }
      });
  }

  static addFile(visitId, file) {
    return new Promise((resolve, reject) => {
        try {
            axios.post(`${url}/${visitId}`, file)
              .then((res) => {
                resolve(res);
              });
          } catch (err) {
            reject(err);
          }
    });
  }

  static deleteFile(fileId) {
    return new Promise((resolve, reject) => {
        try {
            axios.delete(`${url}/${fileId}`)
              .then((res) => {
                resolve(res);
              });
          } catch (err) {
            reject(err);
          }
    });
  }
}

export default FileService;
