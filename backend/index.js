const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
const db = require('./database')

//port number to listen
const port = 5000;
//init
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

//initializing
app.listen(port,()=>{
  console.log("Server starten to listen...");
}); 

//home page 
app.get('/', function(req, res){
  res.send("Only accepting GET and POST requests!");
});

app.post('/auth',function(req,res){
    const mailid = req.body.mailid;
    const password = req.body.password;
    const resul =db.authoriseuser(username,password,(err,result)=>{
        if(err) console.log(err);
        acces = result;
        console.log(acces);
        res.send({
          access: acces,
          user: rep,
        });
    })
    res.send(resul);
})

app.post('/newuser',function(req,res){
  const mailid = req.body.mailid;
  const password = req.body.password;
  const phoneno = req.body.phoneno;
  const address = req.body.address;
  const medical_condition = req.body.medical_condition;
  const caretakerid = req.body.caretakerid;
})