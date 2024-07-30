const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const BUCKET_NAME = 'bucket-bogify-node';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});

const bucket = storage.bucket(BUCKET_NAME);

module.exports = bucket;
