const express = require('express');
const router = express.Router();
const cors = require("cors")
const db = require("../database/database")
router.use(cors());

//values for admin dashboard
router.get("/",(req,res)=>
{
  res.send("Hello all")
  const username = req.body.username;
  const password = req.body.password;
  const resul =db.authoriseuser(username,password,(err,result)=>{
    if(err) console.log(err);
    acces = result;
    console.log(acces);
    res.send({
      access: acces,
    });
  })
})

module.exports = router;