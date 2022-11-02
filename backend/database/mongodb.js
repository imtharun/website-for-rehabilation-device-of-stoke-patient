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

function addsession(id,sessionno,data,callback){
  const myobj = { [sessionno]:data  };
  db.collection(id).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    callback(err,res);
  });
}

function retrievepatientdata(patientid,callback){
  db.collection(patientid).find({}).toArray(function(err, result) {
    if (err) throw err;
    callback(err,result);
  });
}

function gettotalpatientsessions(patientid,callback){
  db.collection(patientid).find({}).toArray(function(err, result) {
    callback(err,result);
  });
}

function getsessionnumber(patientid,callback){
  db.collection(patientid).find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    callback(err,result.length+1);
  });
}

module.exports = {
  createcoollection,
  retrievepatientdata,
  addsession,
  getsessionnumber,
  gettotalpatientsessions
}