'use strict'

const express = require('express')
  , app = module.exports = express()
  , fs = require('fs')
  , path = require('path')
  , s3 = require('s3')
  , awsS3 = require('./aws-s3.js').awsS3
  ;

// First pass just to test it...  
function uploadToS3(req, response){

  let filename = req ? req.body.filename : 'aws-s3.js'
  let filepath = path.resolve(__dirname, filename)

   let params = {
      localFile: filepath,
      s3Params: {
        Bucket: awsS3.config.bucket,
        Key: filename
      }
    }

  let uploader = awsS3.client.uploadFile(params)

  uploader.on('error', function(err) {
    console.error("\nUnable to upload to S3: "+ err);
  })
  
  uploader.on('end', function(data) {
    let key = 'ETag'
    // This way we know we succeeded but certain there is a better way
    console.log(data.hasOwnProperty(key) + "  AWS response has an ETag")
    console.log( awsS3.getImageURL(filename) )
  })

}  

// Delete me...
uploadToS3(null, null)

app.post('/factory/upload_to_s3', uploadToS3)

