// TODO: HTML Requests for Files (GET, POST, DELETE)

'use strict';

const router = require('express').Router();
const async = require('async');
const mongoose = require("mongoose");
const moment = require('moment');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const Files = require('../../models').files;

try{
    let gfs = new mongoose.mongo.GridFSBucket(Files, {
        bucketName: 'files'
    });
} catch (err) {
    console.log(err);
}

// Create a storage object with a configuration 
const storage = new GridFsStorage({ 
    url: Files,
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
router.post('/:filename',  upload.single("file"), async (req, res) => {
    try {
        let file = await Files.create({ filename: req.files.filename });
        res.json(file);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});


// Getting All File
router.get('/', async (req, res) => {
    try {
        Files.find().exec()
            .then(function (result){
                res.json(result);
            })
            .catch(() => {
                res.redirect('/patients/visits');
            });

    } catch (err) {
        console.log(err);
        return res.status(500).json('Loading Files Failed');
    }
});

module.exports = router;
