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

router.post("/employee",(req,res)=>
{
    const data = "hello";
    res.send(resdata);
});




router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router; 