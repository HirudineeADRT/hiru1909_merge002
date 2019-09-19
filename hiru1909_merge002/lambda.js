let google = require('googleapis').google;
let _auth = require('./Authorizer');
const storage = google.storage('v1');
let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);
const cognito_idp = new AWS.CognitoIdentityServiceProvider();


exports.handler = function (event, context, callback) {
    sqs.receiveMessage({
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/KTestSQS`,
        AttributeNames: ['All'],
        MaxNumberOfMessages: '1',
        VisibilityTimeout: '30',
        WaitTimeSeconds: '0'
    }).promise()
        .then(receivedMsgData => {
            if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
                let receivedMessages = receivedMsgData.Messages;
                receivedMessages.forEach(message => {
                    // your logic to access each message through out the loop. Each message is available under variable message 
                    // within this block
                });
            } else {
                console.log(response.data); // edited from github || edit oo2
            }
        })
        .catch(err => {
            // error handling goes here hirudinee edited from Github
        });

    cognito_idp.listUsers({
        UserPoolId: "us-east-1_D10y3fy0o",
        Limit: 10
    }, function (error, data) {
        if (error) {
            // implement error handling logic here
            throw error;
        }
        // your logic goes within this block
    });
    storage.objects.list({
        bucket: 'sample_gcs',
        maxResults: 10,
        prefix: ''
    })
        .then(response => {
            console.log(response.data);           // successful response

        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });

    callback(null, { "message": "Successfully executed" });
}
