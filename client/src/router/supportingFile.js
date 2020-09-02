// /patient/supportingFile

import Vue from 'vue';
import VueRouter from 'vue-router';
import supportFileView from '../views/SupportFiles.vue'; // Need to Change

const express = require('express');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const url = ''; // need to change this

const router = express.Router();

// Create a storage object with a configuration 
const storage = new GridFsStorage({ url });


// Set multer storage engine to the newly created object
const upload = multer({ storage });

// Getting the list of filenames of the supporting files
router.get('/', (req, res) => {
    res.send("Hello World");
});


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
