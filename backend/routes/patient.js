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
  res.send("hi");
  // db.dashboard_patient(id,(err,result)=>{
  //   if(err){
  //     res.send(err);
  //   }
  //   else{
  //     res.send(result);
  //   }
  // })
})


router.get("/sess",(req,res)=>{
    const id = "patient1@gmail.com";
    db.patientsessions(id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(result);
      }
    })
})


//this is to add user data after checking the data in the jwt token
router.post("/addusrdata", (req, res) => {
    // const id = jwt.getjwt(req, res);
    const id = req.userid;
    const sessionid = req.body.sessionid;
});

//return data for user to check data of recent sessions
router.get('/recentsessions',(req,res)=>{
    const id = req.userid;
    res.send("recent sessions....");
});

router.get("/feedback",(req,res)=>{
    const id = req.userid;
    res.send("feedback");
})

//404 error page
router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router; 