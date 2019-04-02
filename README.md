# AWS-Image2text
Demo of AWS Rekognition web application,
This is a POC on how a client could utilise Rekognition for pulling text from there users photos submitted to there portal.

Nothing flash on the Front End, Just a simple Upload + Submit button.

Upon hitting Submit, The app creates a new S3 Bucket, Uploads the image, Then sends it to Rekognition for Text Detection and returns the text found underneath.

##### Dep:
React, Express, Axios, Multer, AWS-SDK

    git clone https://github.com/philliplakis/AWS-Image2text.git
    cd AWS-Image2text
#### Move the example config to correct file:
    mv aws_config.json.example aws_config.json
#### Edit config with your Secret & Access Key:
            {
            "accessKeyId":"ACCESS_KEY",   // Your AWS IAM users access key.
            "secretAccessKey":"SECRECT_KEY", // Your AWS IAM users Secret key.
            "region":"ap-southeast-2"   // choose your region for AWS.
            }
            
#### Start Web Server:
    cd client
    npm install && start

#### New Terminal Start Backend:
    cd server
    npm install
    node server.js
