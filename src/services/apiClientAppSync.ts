import AWSAppSyncClient from 'aws-appsync';
import {AUTH_TYPE} from 'aws-appsync/lib/client';
import {API_URL, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY} from '../consts';
export default new AWSAppSyncClient({
    url: API_URL,
    region: AWS_REGION,
    auth: {
        type: AUTH_TYPE.AWS_IAM,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }
    },
});
