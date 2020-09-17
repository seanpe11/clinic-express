// TODO: HTML Requests for Files (GET, POST, DELETE)

'use strict';

require('dotenv').config();

const router = require('express').Router();
const async = require('async');
const mongoose = require("mongoose");
const moment = require('moment');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const Files = require('../../models').files;

try{
    const url = process.env.TEST_DB;
    const connect = mongoose.createConnection(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let gfs;

    connect.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
        console.log('multer connected');
    })
} catch (err) {
    console.log(err);
}

// Create a storage object with a configuration 
const storage = new GridFsStorage({ 
    url: process.env.TEST_DB,
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

// Uploading single file
router.post('/:filename',  upload.single("file"), async (req, res) => {
    try {
        let file = await Files.create({ 
            filename: req.files.filename, 
            visitID: req.body.visitID,
        });
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
                res.status(200).json(result);
            })
            .catch(() => {
                res.redirect('/patients/visits');
            });

    } catch (err) {
        console.log(err);
        return res.status(500).json('Loading Files Failed');
    }
});

// Getting Files by Visit ID
router.get('/:visitID', async (req, res) => {
    try {
        Files.find({ visitID: req.body.visitID }).exec()
            .then(function (result) {
                res.json(result);
            })
            .catch(() => {
                res.redirect('/patients/visits');
            })
    } catch (err) {
        console.log(err);
        return res.status(500).json('Loading Files Failed');
    }
})

module.exports = router;
