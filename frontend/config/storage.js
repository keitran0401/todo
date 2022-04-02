const { Storage } = require('@google-cloud/storage');
const path = require('path');

const KEY_FILENAME = path.join(__dirname, 'todo-app-344320-27e427a63108.json');
const BUCKET_NAME = 'kei-todo-app';

const storage = new Storage({
  keyFilename: KEY_FILENAME,
});

storage.createBucket(BUCKET_NAME).catch(console.error);
