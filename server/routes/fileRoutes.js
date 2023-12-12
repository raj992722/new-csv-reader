const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join('client/uploads'));
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
})
const upload=multer({storage:storage});

router.post('/upload',upload.single('file'));
router.get('/list', fileController.list);
router.get('/data/:filename', fileController.getData);

module.exports = router;
