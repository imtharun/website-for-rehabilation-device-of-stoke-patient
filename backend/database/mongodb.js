var MongoClient = require('mongodb').MongoClient;
var config = require("./config_sql")
var url = config.mongodburl
var db = "configdatabase"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("db");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

module.exports ={
  
}