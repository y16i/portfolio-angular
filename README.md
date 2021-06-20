## ESLint
```bash
ng lint
```

## unit tests
```bash
# single run
ng test

# with watcher
ng test --watch=true
```

## Dev
```bash
ng serve

# hot reload
ng serve --hmr
```

## Production build
ng build --prod
or
npm run build --env=production

## CI
CircleCI

## apache2 config sample
```bash
<VirtualHost *:80>
  ServerName my-domain.com
  DocumentRoot /var/www/portfolio/frontend
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

  <Directory /var/www/portfolio/frontend>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>

  Alias /api /var/www/portfolio/WordPress
  <Directory /var/www/portfolio/WordPress>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

## lambda task sample (add S3 trigger)
```
var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});
var codedeploy = new aws.CodeDeploy();
 
exports.handler = function(event, context) {
    const applicationName = 'portfolio';
    const deploymentGroupName = 'portfolio-deploy-group';
    var artifact_type = 'tgz';
    var bucket;
    var key;

    function createDeployment(data) {
        if (!data.Records || data.Records.length === 0) {
            console.error('No Records');
            context.done();
        }
        var params = {
            applicationName: applicationName,
            deploymentGroupName: deploymentGroupName,
            description: 'Lambda invoked codedeploy deployment',
            ignoreApplicationStopFailures: false,
            revision: {
                revisionType: 'S3',
                s3Location: {
                    bucket: bucket,
                    bundleType: artifact_type,
                    key: key
                }
            }
        };
        codedeploy.createDeployment(params, 
            function (err, data) {
                if (err) {
                    context.done('Error','Error creating deployment: ' + err);
                }
                else {
                    console.log(data);           // successful response
                    console.log('Finished executing lambda function');
                    context.done();
                }
        });
    }
 
    console.log('Received event:');
    console.log(JSON.stringify(event, null, '  '));
 
    // Get the object from the event
    bucket = event.Records[0].s3.bucket.name;
    key = event.Records[0].s3.object.key;
    createDeployment(event);
};
```