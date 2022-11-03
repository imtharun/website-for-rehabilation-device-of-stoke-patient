const express = require('express');
const bodyParser = require("body-parser");
const db = require("../database/mysql_db");
const mongodb = require("../database/mongodb.js");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());

const checkexist = (arr,ele) => {
  for(let i=0;i<arr.length;i++){
    const a = arr[i].patient_name;
    if(a === ele){
      return true;
    }
  }
  return false;
};

router.get("/dashboard",(req,res)=>{
    const id = req.userid;
    db.dashboard_doctor(id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        let sol = [];
        let count = 0;
        result.forEach((index,ind) => {
          if(checkexist(sol,index.patient_name)){
            let a = sol[count-1].caretaker_name;
            a.push(index.caretaker_name);
          }
          else{
            let caretaker_name = [index.caretaker_name];
            sol[count] = {
              patient_name : index.patient_name, 
              patient_id : index.patient_id,
              caretaker_name : caretaker_name,
              patient_dob : index.patient_dob
            };
            count = count + 1;
          }
        });
        session = {};
        sol.forEach((index,ind) => {

        });
        res.send(sol);
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