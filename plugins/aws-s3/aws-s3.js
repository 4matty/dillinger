'use strict'

const path = require('path')
  , fs = require('fs')
  , s3 = require('s3')
  ;

var aws_s3_config_file = path.resolve(__dirname, 'aws-s3-config.json')
  , aws_s3_config = {}
  , isConfigEnabled = false
  ;

// Check for config file existence
if ( fs.existsSync(aws_s3_config_file) ){
  aws_s3_config = require(aws_s3_config_file)
  isConfigEnabled = true
}
// Check for environment variables
else if(process.env.aws_s3_app_key !== undefined){

 aws_s3_config = {
  "username" : process.env.aws_s3_username, 
  "access_key": process.env.aws_s3_access_key,  
  "secret_access_key" : process.env.aws_s3_secret_access_key,
  "region": process.env.aws_s3_region,
  "endpoint": process.env.aws_s3_endpoint,
  "bucket": process.env.aws_s3_bucket,
  "s3_url" : process.env.aws_s3_url, 
  "s3_cname_url" : ( process.env.aws_s3_cname_url || process.env.aws_s3_url )
  }

  isConfigEnabled = true;
  console.log('AWS S3 config found in environment. Plugin enabled. (Key: "' + aws_s3_config.access_key + '")');
}
// We have nothing
else {
 
 aws_s3_config = {
  "username" : "USERNAME", 
  "access_key": "YOUR_ACCESS_KEY",  
  "secret_access_key" : "YOUR_SECRET_KEY",
  "region": "REGION",
  "endpoint": "YOUR_ENDPOINT",
  "bucket": "YOUR_BUCKET",
  "s3_url" : "http://s3.dillinger.io.amazonaws.com/s3.dillinger.io/", 
  "s3_cname_url" : "http://s3.dillinger.io"
  }

  console.warn('AWS S3 config not found at ' + aws_s3_config_file + '. Plugin disabled.');
}

// export our object

exports.awsS3 = (function awsS3IIFE(){

  let client = s3.createClient({
    s3Options: {
      accessKeyId: aws_s3_config.access_key,
      secretAccessKey: aws_s3_config.secret_access_key,
      endpoint: aws_s3_config.endpoint
    }
  })

  function _constructImageURL(filename){
    return aws_s3_config.s3_url + filename
  }

  return {
    isConfigured: isConfigEnabled,
    config: aws_s3_config,
    client: client,
    getImageURL: _constructImageURL
  }

})()