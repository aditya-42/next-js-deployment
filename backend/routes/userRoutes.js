const express = require('express');
const router = express.Router();
const multer = require('multer');

const path = require('path');
const userController = require('../controllers/UserController');


//storing resume -- profile files into folders
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/profile-images/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = req.headers.authorization?.split(" ")[1];

//   if (token == null) return res.status(401).json({ message: "Unauthorized" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });

//     //attach user info
//     req.user = user;
//     next();
//   });
// };


  //routes
router.post('/create-users',upload.single('profile') , userController.createUser);
router.post('/login', userController.loginUser); //login user




router.get('/get-users', userController.getUsers); //all users
router.get('/get-user/:id', userController.getUserById); //get single user by id
router.put('/update-user/:id', userController.updateUser); //update user by id
router.delete('/delete-user/:id', userController.deleteUser); //delete user by id

module.exports = router;


