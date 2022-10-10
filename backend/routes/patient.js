//imports
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../database/mysql_db");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("../Helper/JWT.js");
const mongodb = require("../database/mongodb.js");
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.use(express.json());
router.use(cookieParser());
router.use(cors());
// const db = require('../mysql_connect');
// const pg = require('../postgre_connect')

//this is to add user data after checking the data in the jwt token
router.post("/addusrdata", (req, res) => {
    const id = jwt.getjwt(req, res);
    const sessionid = req.body.sessionid;
});

//return data for user to check data of recent sessions
router.get('/recentsessions',(req,res)=>{
    const resp = jwt.getjwt(req, res);
    console.log("dashboard = "+resp);
    if(resp===undefined){
      console.log("invaliduserid...");
      return
    }
    res.send("recent sessions....");
    console.log("====================================");
    console.log(resp);
    console.log("====================================");
});

router.get('/download/:id',(req,res)=>{
    const userid = jwt.getjwt(req,res);
    if(userid===undefined){
      console.log("invaliduserid...");
      return
    }
    const sessionid = req.params.id;
    const result = db.downloaddata(userid,sessionid,(err,result)=>{
      if(err){
        console.log(err);
        return
      }})
});




//404 error page
router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router; 