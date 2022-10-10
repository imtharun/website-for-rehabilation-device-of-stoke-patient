var MongoClient = require('mongodb').MongoClient; //package
const { connectDb, getDb } = require('./mongoconnect')


var db // store db object in this object
connectDb(() => ( db = getDb() ))

function createcoollection(name,callback){
  db.createCollection(name, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    callback(err,res);
  });  
}


module.exports = {
  createcoollection,
}