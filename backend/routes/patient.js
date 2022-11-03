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
        db.dashboard_patient(id,(err,resu)=>{
          if(err){
            res.send(err);
          }
          else{
            const card = {
              card : resu,
              session : result
            }
            res.send(card);
          }
        })
      }
    })
})

router.post("/submitNewSession",(req,res)=>{
  const id = req.userid;
  const game = req.body.ans;
  console.log("game:",game);
  mongodb.getsessionnumber(id,(err,result)=>{
    if(err){
      res.send(err);
    }
    else{
      const sessionno = "session"+String(result);
      mongodb.addsession(id,sessionno,game,(err,resul)=>{
        if(err){
          res.send(err);
        }
        else{
          res.sendStatus(200);
        }
      })
  }
})
});

router.get("/getsessiondata",(req,res)=>{
  const id = req.userid;
  const sessionid = req.body.sessionid;
  mongodb.retrievepatientdata(id,(err,result)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  })
});

router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router; 