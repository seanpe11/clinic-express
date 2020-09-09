// TODO: HTML Requests for Files (GET, POST, DELETE)

'use strict';

const router = require('express').Router();
const async = require('async');
const mongoose = require("mongoose");
const moment = require('moment');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const Files = require('../../models').files;
const url;

const conn = mongoose.createConnection(Files, {
   useNewUrlParser: true,
   useUnifiedTopology: true 
});

let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'files'
    });
})


// Create a storage object with a configuration 
const storage = new GridFsStorage({ 
    url: url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            if (err) return reject(err);

            if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' 
                || file.mimetype === 'application/pdf') {

                const fileInfo = {
                    filename: req.file.filename + path.extname(file.originalname),
                    bucketName: 'files'
                }

                resolve(fileInfo);

            } else return reject(err);
        });
    }

});


// Set multer storage engine to the newly created object
const upload = multer({ storage });

// Uploading Files
router.post('/:filename',   )


// Getting the Picture from the data base
router.get('/:filename', (req, res) => {
    var filename = req.params.filename;

    // Search in the data base
});


// Adding a Supporting file
router.post('/addFile', upload.array('photos', 9), (req, res) => {

    var filenames = req.files.map(function(file) {
        return file.filename;
    });
 
    try{
        // Save to database
        

    } catch (e){
    
    } finally {

        // Render to the Supporting File Page
        res.render();
    }
});

// Deleting File
router.delete('/deleteFile/:filename', (req, res) => {
    var imageToDelete = req.params.filename;

    // Delete Image from Chunk and Model
})


module.exports = router;
