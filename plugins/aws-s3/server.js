const express = require('express')
  , app = module.exports = express()
  , fs = require('fs')
  , path = require('path')
  , s3 = require('s3')
  ;

  
function upload_to_s3(){
  throw new Error("not implemented yet: upload_to_s3 function ")
}  
app.post('/factory/upload_to_s3', upload_to_s3)

