'use strict'

const test = require('tape')
  , lodash = require('lodash')
  , fs = require('fs')
  , s3 = require('s3')
  , request = require('request')
  , awsS3 = require('./aws-s3.js').awsS3
  , path = require('path')
  , config_path = path.resolve(__dirname, 'aws-s3-config.json')
  ;

var config
  , filename = 'aws-s3.js'
  ; 

test('sanity check', t=> {

  t.plan(1)
  t.ok(awsS3, 'awsS3 module exists')

}) // end test 1

test('verify aws-s3 config exists', t=>{

  t.plan(1)
  try{

    if ( fs.existsSync(config_path) ){ 
      // Assign config here for future tests
      config = require(config_path) 
      t.ok(config, 'AWS S3 config file exists')
    }
    else t.fail('AWS S3 config file does not exist')

  }
  catch(e){
    t.fail(e)
  }

}) // end test 2


test('verify file upload to s3', t=> {
  
  t.plan(1)

  try {

    let params = {
      localFile: path.resolve(__dirname, filename),
      s3Params: {
        Bucket: config.bucket,
        Key: filename
      }
    };

    let uploader = awsS3.client.uploadFile(params)

    uploader.on('error', function(err) {
      console.error("\nUnable to upload to S3: "+ err);
    })
    
    uploader.on('end', function(data) {
      let key = 'ETag'
      // This way we know we succeeded but certain there is a better way
      t.assert(data.hasOwnProperty(key), "AWS response has an ETag") 
    })

  }
  catch(e) {
    t.fail(e, 'failed to upload to s3')
    console.log(e)
  }


}) // end test 3

test('verify url of file exists', t=> {
  
  t.plan(1)

  try {
    
    request(awsS3.getImageURL(filename), function urlCheckCb(req, response, body){
      t.equals(response.statusCode, 200, "File exists on AWS")
    })

  }
  catch(e) {
    t.fail(e, 'failed to get URL of file')
    console.log(e)
  }


}) // end test 4

