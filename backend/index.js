//imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/mysql_db");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("./Helper/JWT.js");
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
  origin:["http://localhost:3000","http://localhost:3000/patient/dashboard","http://localhost:3000/login"], 
  credentials:true,
  optionsSuccessStatus: 200}));
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3000/patient/dashboard', 'http://localhost:3000/login'];
app.use((req,res,next)=>{
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
}
  // res.setHeader('Access-Control-Allow-Origin',["http://localhost:3000/","http://localhost:3000/patient/dashboard","http://localhost:3000/login"]);
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})
//initializing
app.listen(port, () => {
  console.log("Server starten to listen...");
});

//function to validate user id and add it to request
async function validateCookiesfunc (req, res, next) {
  req.userid = jwt.getjwt(req, res);
  console.log("dashboard = "+req.userid);
  if(req.userid === undefined){
    return
  }
  next()
}

//developer mode enabled
app.get("/sett", function (req, res) {
  res.cookie("access-token", "eyJhbGciOiJIUzI1NiJ9.cmVzdWx0LnVzZXJpZGZyb21kYXRhYmFzZQ.4-rJnJ8eX-fm0FRbcmfBeukeU-COT1S4tsNlYk4jqig", {
    maxAge: 60 * 30 * 1 * 30 * 1000, //used this for security reasons...
  });
  res.send("done");
});

//home page
app.get("/", function (req, res) {
  res.send("Only accepting GET and POST requests!");
});

//register a new user
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      console.log(email, hash);
      res.json({ email, hash });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Clearing cookie to logout user
app.get("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.sendStatus(200);
});

//login the user
app.post("/login", async (req, res) => {
  console.log(req.body,"dfsfsdff");
  const email = req.body.email;
  const password = req.body.password;
  const cooki = req.cookies["access-token"];
  if (!cooki === undefined) {
    jwt.validateUser(cooki);
  }
  const rest = db.authorise(email, password, (err, result) => {
    if (err) console.log("err=" + err);
    if (result.access === "denied") {
      res.status(400).json({ error: "wrong email and password combinations" });
    } else {
      const id = result.userid;
      const accessToken = jwt.createToken(id);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 30 * 1 * 30 * 1000,
        httpOnly: true,
        // domain: undefined,
        // sameSite: "lax",
        //used this for security reasons...
      });
      //use function to send all dashboard data
      // res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
      // res.setHeader('Access-Control-Allow-Credentials',true);
      const userType = "patient";
      res.json({userType});
      res.send();
    }
  });
});

app.use(validateCookiesfunc);
app.use("/patient", patient);
app.use("/doctor", doctor);
app.use('/caretaker', caretaker);

//return data for user dashboard
app.get("/dashboard", (req, res) => {
  const userid = req.userid;
  res.send("hello page!");
});


app.get('/test',(req,res)=>{
  console.log("user i  ===",req.userid)
  res.send("ok")
});


//respond for other unused pages
app.get('*', function(req, res){
  res.sendStatus(404).json({
    error:"Sorry this is an invalid URL!"});
});
