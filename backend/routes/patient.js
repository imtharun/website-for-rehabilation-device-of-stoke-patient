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
    mongodb.retrievepatientdata(id,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(result);
      }
    })
})


// router.get("/gamelevels", (req, res) => {
//     const id = req.userid;
//     db.getlevels(id, (err, result) => {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.send(result);
//         }
//     });
// });


router.post("/submitNewSession",(req,res)=>{
  const id = req.userid;
  const game = req.body.ans;
  mongodb.getsessionnumber(id,(err,result)=>{
    if(err){
      res.send(err);
    }
    else{
      const sessionno = "session"+String(result);
      mongodb.addsession(id,sessionno,game,(req,res)=>{
        if(err){
          res.send(err);
        }
        else{
          console.log("Added to mongo...");
        }
      })
  }
})
});

router.get("/getsessiondata",(req,res)=>{
  const id = req.userid;
  const sessionid = "session1";
  mongodb.retrievepatientdata(id,(err,result)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send(String(result.length));
    }
  })
});

//404 error page
router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router; 