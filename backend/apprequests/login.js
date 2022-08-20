const express = require('express');
const router = express.Router();
const cors = require("cors")
router.use(cors());

//values for admin dashboard
router.get("/",(req,res)=>
{
  res.send("Hello all")
})

module.exports = router; 