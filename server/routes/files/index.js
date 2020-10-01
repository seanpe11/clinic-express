const Files = require('../../models').files;

// Get files from Visit id
router.get('/:id', async (req, res) => {
  try {
      let files = await Files.findOne({ visitID: req.params.id });
      if(!files) return res.status(400).json('Files not found');
      res.json(files);
  } catch (err) {
      console.log(err);
      return res.status(500);
  }
});

// Post new req.bidy as file to Visit id
router.post('/:id', async (req, res) => {
  // Code here
  try {
      let file = new Files();
      
      file.filename = req.body.filename;
      file.visitID = req.params.id;
      file.filedata = req.body.filedata;

      await visit.save();

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