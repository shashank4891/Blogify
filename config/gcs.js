const { Storage } = require('@google-cloud/storage');
const path = require('path');

const KEYFILEPATH = path.resolve(__dirname, 'blogify-node-4891-1aa0b0f9509c.json');
const BUCKET_NAME = 'bucket-bogify-node';

const storage = new Storage({ keyFilename: KEYFILEPATH });
const bucket = storage.bucket(BUCKET_NAME);

module.exports = bucket;
