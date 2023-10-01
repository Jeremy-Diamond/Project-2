const dotenv = require('dotenv');

dotenv.config();

const MongoClient = require('mongodb').MongoClient;

//declare a variable to hold the database connection
let db;

const initDb = (callback) => {
  //connect to the database
 if (db) {
   //console.log("Database is already initialized");
   return callback(null, db);
 }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
        db = client;
        callback(null, db);
        })
        .catch((err) => {
        callback(err);
        });
};

const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};

module.exports = {
    initDb,
    getDb
    };