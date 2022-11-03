//imports
const express = require('express');
const bodyParser = require("body-parser");
const db = require("../database/mysql_db");
const mongodb = require("../database/mongodb.js");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());


router.post("/dashboard",(req,res)=>{
    const id = req.userid;
    db.dashboard_doctor(id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(result);
      }
    });
});


router.post("/patientdetails",(req,res)=>{
  const id = req.userid;
  const patientid = req.body.email;
  mongodb.retrievepatientdata(patientid,(err,result)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  })
})


router.get('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router; 