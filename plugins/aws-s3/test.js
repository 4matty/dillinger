const test = require('tape')
  , s3 = require('./aws-s3')
  , lodash = require('lodash')
  , fs = require('fs'),
  , isFunction = lodash.isFunction
  ;

test('sanity', t=> {
  t.plan(1)
  t.ok(s3, 's3 exists')
})

test('verify upload to s3', t=> {
  t.plan(1)
  try {
    tzSearch()
  }
  catch(e) {
    t.ok(e, 'failed with bad params and we got a meaningful error')
    console.log(e)
  }

var params = {
  localFile: "some/local/file",
 
  s3Params: {
    Bucket: "s3 bucket name",
    Key: "some/remote/file"
  },
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

}) // end test 1
