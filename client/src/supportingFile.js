import axios from 'axios'

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const url = 'http://localhost:5000/api/files';
const collection = db.collection('uploads.files');
const collectionChunks = db.collection('uploads.chunks');

// Create a storage object with a configuration 
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        if
    } 
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });

class SupportingFiles {
    static getFile()

}
export default SupportingFiles;
