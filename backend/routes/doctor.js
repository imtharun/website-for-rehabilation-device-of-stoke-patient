//imports
const express = require('express');
const bodyParser = require("body-parser");
const db = require("../database/mysql_db");
const mongodb = require("../database/mongodb.js");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());


router.get("/dashboard",(req,res)=>{
    const id = req.userid;
    db.dashboard_doctor(id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        let sol = {};
        let caretakerarr = []
        result.forEach(index => {
          if(index.patient_id in sol){
            sol[index.patient_id].push(index.caretaker_name);
          }
          else{
            sol[index.patient_id] = [index.caretaker_name];
          }
        });
        const solu = {caretakers : sol};
        res.send(result.concat(solu));
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