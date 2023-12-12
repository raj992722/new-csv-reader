const express = require('express');
const fileRoutes = require('./server/routes/fileRoutes');
const path=require("path");
require('dotenv').config();

// const multer=require('multer')

const app = express();
const PORT = process.env.PORT || 3000;

// const {initializeApp}=require('firebase/app');
// const {getStorage,ref,uploadBytes}=require('firebase/storage');
// const firebaseapp= initializeApp(require('./firebaseConfig.js'));

// const storage=multer.memoryStorage();
// const upload=multer({storage});




// app.set('view engine', 'ejs');
// app.set("views",path.join(__dirname,"/server/views"));
app.use(express.json());
app.use(express.static('client')); // Serve static files from the 'client' folder
// app.use('/',(req,res)=>res.render("index"));
app.use('/api/files', fileRoutes);


// app.post('/upload',upload.single('file'),async (req,res)=>{
    
    

//   try {
//       const file=req.file;
//   if(!file){
//       return res.status(400).send('No file uploaded'); }

//       //get firebase storage reference
//       const storageRef=ref(getStorage(firebaseapp),'uploads/'+Date.now()+'-'+file.originalname);

//    const data=   await uploadBytes(storageRef,file.buffer);
//       res.send({msg:'file uploded successfully to firebase storage',data });
//   } catch (error) {
//       console.error('error uploading file to firebase storage',error);
//       res.status(500).send('Internal server error');
//   }
//    });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
