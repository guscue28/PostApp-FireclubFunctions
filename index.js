const functions = require("firebase-functions");
const admin = require('firebase-admin');
const serviceAccount = require('./config/app-test-fede9-firebase-adminsdk-1h03x-9348babaea.json');
const createUser = require("./createUser");
const posts = require('./posts');
const myPosts = require('./myPosts');

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.createUser= functions.https.onRequest(createUser);
exports.posts = functions.https.onRequest(posts(db));
exports.myPosts = functions.https.onRequest(myPosts(db));