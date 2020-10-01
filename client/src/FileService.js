import axios from 'axios';

const url = 'http://localhost:5000/api/files';

class FileService {
  static getFiles(visitId) {
      return new Promise((resolve, reject) => {
          axios.get(`${url}/${visitId}`)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
  }

  static addFile(visitId, file) {
    return new Promise((resolve, reject) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            axios.post(`${url}/${visitId}`, formData)
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
