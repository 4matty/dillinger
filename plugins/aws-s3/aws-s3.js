const path = require('path')
  , fs = require('fs')
  , s3 = require('s3')

const aws_s3_config_file = path.resolve(__dirname, 'aws-s3-config.json')
  , aws_s3_config = {}
  , isConfigEnabled = false
  ;

if ( fs.existsSync(aws_s3_config_file) ){
  aws_s3_config = require(aws_s3_config_file)
  isConfigEnabled = true
}
else if(process.env.aws_s3_app_key !== undefined){

 aws_s3_config = {
  "username" : process.env.aws_s3_username, 
  "access_key": process.env.aws_s3_access_key,  
  "secret_access_key" : process.env.aws_s3_secret_access_key,
  "s3_url" : process.env.aws_s3_url, 
  "s3_cname_url" : ( process.env.aws_s3_cname_url || process.env.aws_s3_url )
  }

  isConfigEnabled = true;
  console.log('AWS S3 config found in environment. Plugin enabled. (Key: "' + aws_s3_config.access_key + '")');
} 
else {
 
 aws_s3_config = {
  "username" : "dillinger", 
  "access_key": "YOUR_ACCESS_KEY",  
  "secret_access_key" : "YOUR_SECRET_KEY",
  "s3_url" : "http://s3.dillinger.io.amazonaws.com/s3.dillinger.io/", 
  "s3_cname_url" : "http://s3.dillinger.io"
  }

  console.warn('AWS S3 config not found at ' + aws_s3_config_file + '. Plugin disabled.');
}

//exports.awsS3 = (function awsS3(){

  var client = s3.createClient({
              s3Options: {
                accessKeyId: aws_s3_config.app_key,
                secretAccessKey: aws_s3_config.secret_access_key,
                region: aws_s3_config.region,
                endpoint: aws_s3_config.endpoint
              },
             })


    var params = {
      localFile: require("./aws-s3.js"),
      s3Params: {
        Bucket: aws_s3_config.region,
        Key: aws_s3_config.app_key
      }
    };

var uploader = client.uploadFile(params);
uploader.on('error', function(err) {
  console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressMd5Amount,
            uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});

  // return {
  //   isConfigured: isConfigEnabled,
  //   config: aws_s3_config,
  // }

//})()