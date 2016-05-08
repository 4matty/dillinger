Amazon s3 Dillinger Plugin
==

0. Create your s3 bucket on Amazon:  
1. Create your `aws-s3-config.json`.  It needs to contain:

```js
{
  "username" : "USERNAME", 
  "access_key": "YOUR_ACCESS_KEY",  
  "secret_access_key" : "YOUR_SECRET_KEY",
  "region": "REGION",
  "endpoint": "YOUR_ENDPOINT",
  "bucket": "YOUR_BUCKET",
  "s3_url" : "http://s3.dillinger.io.amazonaws.com/s3.dillinger.io/", 
  "s3_cname_url" : "http://s3.dillinger.io"
}
```

Optional configuration via environment
==

Set the following environment variables if adding `aws-s3-config.json` may present a challenge (when deploying on Heroku for example)

    aws_s3_username="dillinger"
    aws_s3_access_key="YOUR_ACCESS_KEY"  
    aws_s3_secret_access_key="YOUR_SECRET_KEY"
    aws_s3_region="YOUR_REGION"
    aws_s3_endpoint="YOUR_ENDPOINT"
    aws_s3_bucket="YOUR_BUCKET"
    aws_s3_url="http://s3.dillinger.io.amazonaws.com/s3.dillinger.io/" // Use yours
    aws_s3_cname_url="http://s3.dillinger.io" // Optional

## Tests

Run the test in this directory: `tape test.js | tap-spec`
