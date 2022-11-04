const MongoClient = require("mongodb").MongoClient
const config = require('./config_sql');
var db
var uri = config.mongodburl
const dbname = config.mongodbname;

const connectDb = (callback) => {
    if (db) return callback()
    MongoClient.connect( uri, 
        (err, database) => {
            if (err)  throw(err);
            db = database.db(dbname) 
            console.log("Mongodb Connected")
            callback()
        }
    )
}

const getDb = () => {
    return db
}

module.exports = {
    connectDb,
    getDb,
}