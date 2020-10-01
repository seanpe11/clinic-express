const router = require('express').Router();
const Files = require('../../models').files;
const fileUpload = require('express-fileupload');


// Get files from Visit id
router.get('/:id', async (req, res) => {
  try {
      let files = await Files.find({ visitID: req.params.id });
      if(!files) return res.status(400).json('Files not found');
      res.json(files);
  } catch (err) {
      console.log(err);
      return res.status(500);
  }
});

// Post new req.bidy as file to Visit id
router.post('/:id', fileUpload(), async (req, res) => {
  // Code here
  try {
      const newFile = {}
      newFile.filename = req.files.file.name;
      newFile.visitID = req.params.id;
      newFile.filedata = req.files.file;

      await Files.create(newFile);

      res.status(200).send('ok');
  } catch (err) {
      console.log(err)
      return res.status(500).send('save file failed')
  }
});

// Delete file id
router.delete('/:id', async(req, res) => {
  try {
      await Files.findByIdAndDelete(req.params.id);
      res.status(200).send('ok');
  } catch (err) {
      console.log(err);
      return res.status(500);
  }
})

module.exports = router;