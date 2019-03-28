const express = require("express");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid');
const cors = require('cors')

AWS.config.loadFromPath('./aws_config.json');

// Init App
const app = express();
// Allow cross origin

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// AWS Configs
const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();
const bucketName = uuid.v4();
// create new bucket
const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
// Handle file formats
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}
// Upload to S3 Bucket.
const upload = multer({
  fileFilter,
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb( null, {fieldName: file.fieldname} );
      },
      key: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }
    })
});
const singleUpload = upload.single('image')
// Route
app.post('/upload', function(req, res) {
  console.log('Hit /upload')
  bucketPromise.then()
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    } else {
      var params = {Image: {S3Object: {Bucket: bucketName, Name: req.file.key}}};
      rekognition.detectText(params, function(err, data) {
      if (err) {
        return res.status(422).send(err, err.stack); // an error occurred
      } else {
          console.log(data, req.file.location)
          return res.json({ 'imageLocation': req.file.location , 'rekognition': data });
        }
      });
    }
  });
})
// Confirm React can reach
app.get('/is-up', (req, res) => res.send('👌'))

// Set Port
app.set("port", process.env.PORT || 8080);

app.listen(app.get("port") , function() {
  console.log("Server started on port " + app.get("port"));
});
