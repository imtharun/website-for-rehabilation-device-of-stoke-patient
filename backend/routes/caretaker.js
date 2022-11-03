const express = require('express');
const bodyParser = require("body-parser");
const db = require("../database/mysql_db");
const mongodb = require("../database/mongodb.js");
const { route } = require('./patient');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());

router.get("/dashboard",(req,res)=>{
    const id = req.userid;
    db.getcaretakerpatients(id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(result);
      }
    });
});

router.post("/addPatient",(req,res)=>{
    const id = req.userid;
    console.log(req.body);
    const patient_id = req.body.mailId;
    db.linkcaretakerandpatient(id,patient_id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(result).status(200);
      }
    });
});

router.post("/removePatient",(req,res)=>{
    const id = req.userid;
    const patient_id = req.body.mailId;
    db.removecaretakerandpatient(id,patient_id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(result).status(200);
      }
    });
});

router.post("/patientdetails",(req,res)=>{
  const id = req.userid;
  const patientid = req.body.mailId;
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
})

module.exports = router; 