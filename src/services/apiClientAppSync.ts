import * as AWS from 'aws-sdk';
import AWSAppSyncClient from 'aws-appsync';
import {AUTH_TYPE} from 'aws-appsync/lib/client';
import {API_URL, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY} from '../CONST';


const {
    REACT_APP_REGION,
    REACT_APP_ACCESS_KEY_ID,
    REACT_APP_SECRET_ACCESS_KEY,
    REACT_APP_URL
} = process.env;

AWS.config.update({
    region: REACT_APP_REGION || AWS_REGION,
    credentials: new AWS.Credentials({
        accessKeyId: REACT_APP_ACCESS_KEY_ID || AWS_ACCESS_KEY_ID,
        secretAccessKey: REACT_APP_SECRET_ACCESS_KEY || AWS_SECRET_ACCESS_KEY,
    }),
});

export default new AWSAppSyncClient({
    url: REACT_APP_URL || API_URL,
    region: REACT_APP_REGION || AWS_REGION,
    auth: {
        type: AUTH_TYPE.AWS_IAM,
        credentials: AWS.config.credentials!,
    },
});
