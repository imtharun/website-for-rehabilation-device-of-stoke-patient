const MongoClient = require("mongodb").MongoClient
const config = require('./config_sql');

var db
var uri = config.mongodburl
const connectDb = (callback) => {
    if (db) return callback()
    MongoClient.connect( uri, 
        (err, database) => {
            if (err) return console.log(err)
            db = database.db("dbName") 
            console.log("Mongodb Connected")
            callback()
        }
    )
}

const getDb = (collectionToGet) => {
    return db
}

module.exports = {
    connectDb,
    getDb,
}