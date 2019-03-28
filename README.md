# AWS-Image2text
Demo of AWS Rekognition web application
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
