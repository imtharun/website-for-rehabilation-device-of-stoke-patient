//imports
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../database/mysql_db");
const cookieParser = require("cookie-parser");
const mongodb = require("../database/mongodb.js");
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.use(express.json());
router.use(cookieParser());
router.use(cors());


router.post("/dashboard",(req,res)=>{
    const id = req.userid;
    db.dashboard_doctor(id,(err,result)=>{
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