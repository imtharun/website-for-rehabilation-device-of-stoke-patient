//imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/mysql_db");
const cookieParser = require("cookie-parser");
const jwt = require("./helper/jwt.js");
const mongodb = require("./database/mongodb.js");

//routing
const patient = require("./routes/patient");
const doctor = require("./routes/doctor");
const caretaker = require("./routes/caretaker");

//port number to listen
const port = 5000;

//init
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:3000"], 
  credentials:true,
  optionsSuccessStatus: 200}));
app.use(express.json());
app.use(cookieParser());

//request from frontend allowed oringins....
const allowedOrigins = ['http://localhost:3000', 
'http://localhost:3000/patient/dashboard', 
'http://localhost:3000/login',
'http://localhost:3000/signup',
'http://localhost:3000/doctor/dashboard',
];

app.use((req,res,next)=>{
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
}
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})


//initializing
app.listen(port, () => {
  console.log("Server started to listen...");
});


//function to validate user id and add it to request
async function validateCookiesfunc (req, res, next) {
  req.userid = jwt.getjwt(req, res);
  console.log("user_id = "+req.userid);
  if(req.userid === undefined){
    return
  }
  next()
}


//home page
app.get("/", function (req, res) {
  res.send("Only accepting GET and POST requests!");
});

//register a new user
app.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const password  = req.body.password;
  const address = req.body.address;
  const dob = req.body.dob;
  const utype = req.body.userType;
  if(utype === "patient"){
    db.registerauth(name,password,utype,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        db.registerpatient(result,name,email,number,address,dob,(err,resu)=>{
          if(err){
            res.send(err);
          }
          else{
            console.log("Patient sucessfully registered");
            res.send("Patient sucessfully registered").status(200);
          }
        })
      }
    })
  }
  else if(utype === "doctor"){
    db.registerauth(name,password,utype,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        db.registerdoctor(result,name,email,number,address,dob,(err,resu)=>{
          if(err){
            res.send(err);
          }
          else{
            console.log("Doctor sucessfully registered");
            res.send("Doctor sucessfully registered").status(200);
          }
        })
      }
    })
  }
  else if(utype === "caretaker"){
    db.registerauth(name,password,utype,(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        db.registercaretaker(result,name,email,number,address,dob,(err,resu)=>{
          if(err){
            res.send(err);
          }
          else{
            console.log("Patient sucessfully registered");
            res.send("Patient sucessfully registered").status(200);
          }
        })
      }
    })
  }
});

//Clearing cookie to logout user
app.get("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.sendStatus(200);
});


//login the user
app.post("/login", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const cooki = req.cookies["access-token"];
  if (!cooki === undefined) {
    jwt.validateUser(cooki);
  }
  const rest = db.authorise(email, password, (err, result) => {
    if (err) {
    console.log(err);
    }
    if (result.access === "denied") {
      res.status(401).json({ 
        error: "wrong email and password combinations",userType:"Notloggedin" 
      });
    } else {
      // const id = result.userid;
      const id = email;
      const accessToken = jwt.createToken(id);
      res.cookie("access-token", accessToken, {
        maxAge: 1000*60*60*1,
        httpOnly: true,
      });
      const userType = "doctor";
      res.json({userType});
      res.send();
    }
  });
});

app.use(validateCookiesfunc);
app.use("/patient", patient);
app.use("/doctor", doctor);
app.use('/caretaker', caretaker);


//respond for other unused pages
app.get('*', function(req, res){
  res.sendStatus(404).json({
    error:"Sorry this is an invalid URL!"});
});
