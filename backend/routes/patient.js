//imports
const express = require('express');
const bodyParser = require("body-parser");
const db = require("../database/mysql_db");
const mongodb = require("../database/mongodb.js");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());



// router.get("/dashboard",(req,res)=>{
//   const id = req.userid;
//   res.send("hi");
//   // db.dashboard_patient(id,(err,result)=>{
//   //   if(err){
//   //     res.send(err);
//   //   }
//   //   else{
//   //     res.send(result);
//   //   }
//   // })
// })


router.get("/dashboard",(req,res)=>{
    const id = "patient1@gmail.com";
    // const id = req.userid;
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
router.get("/gamelevels", (req, res) => {
    const id = req.userid;
    global.getlevels(id, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

router.post("/submit",(req,res)=>{
  const id = req.userid;
  const roms = req.body.roms;  //json
  const game = req.body.game; //str
  const timer = req.body.timer; //total time 
  const timeInHMS = req.body.timeInHMS; //obj od hour min sec
  const levels = req.body.levels; //json
})



router.get("/feedback",(req,res)=>{
    const id = req.userid;
    const assessmentMeth = req.body.assessmentMeth;
    const score = req.body.score;
    const outOf = req.body.outOf;
    const percentage = req.body.percentage;
    res.send("feedback");
})

//404 error page
router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router; 