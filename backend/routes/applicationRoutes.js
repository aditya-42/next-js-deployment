const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const applicationController = require('../controllers/ApplicantionController');


console.log(applicationController.getAllApplications);
//storing resume -- profile files into folders
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resumes/");
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.originalname}`;
      cb(null, fileName);
    },
  });


const upload = multer({ storage: storage });
//routes

//get all applications for that user
router.get('/applications/:email', applicationController.getAllApplications);

//route to apply for job
router.post('/apply' , upload.single('resume') , applicationController.submitApplication);


module.exports = router;