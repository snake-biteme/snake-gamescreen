import * as AWS from 'aws-sdk'
import AWSAppSyncClient from 'aws-appsync'
import {AUTH_TYPE} from 'aws-appsync/lib/client'


AWS.config.update({
    region: 'eu-central-1',
    credentials: new AWS.Credentials({
        accessKeyId: 'AKIAXSHWDEE3TL4PZPE5',
        secretAccessKey: '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',
    }),
});

export default new AWSAppSyncClient({
    url: 'https://efmtgafdgrabfamesyqszszv5e.appsync-api.eu-central-1.amazonaws.com/graphql',
    region: 'eu-central-1',
    auth: {
        type: AUTH_TYPE.AWS_IAM,
        credentials: AWS.config.credentials!,
    },
});
