const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const upload = multer({ dest: 'client/uploads/' });


const path = require('path');

exports.upload = upload.single('file');



exports.list = (req, res) => {
  const files = fs.readdirSync('client/uploads/');
  // console.log(files);
  res.json({
    files: files
  });
};

// exports.create = (req, res) => {
//   const { file, buffer } = req.file; // Use buffer instead of data
//   console.log(req.file);

//   if (!req.file) {
//     return res.status(400).send("No file found");
//   }

//   const filePath = path.join(__dirname, 'client/uploads/', file.substr(0,6));

//   fs.writeFileSync(filePath, buffer,"utf-8"); // Use buffer to write the file

//   res.status(200).json({ success: true, message: 'File created successfully' });
// };

exports.getData = (req, res) => {
  const filename = req.params.filename;
  const data = [];

  fs.createReadStream(path.join('client/uploads/', filename))
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      res.json(data);
    });
};
