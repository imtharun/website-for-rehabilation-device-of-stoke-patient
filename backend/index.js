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
// const mobileapp = require('./apprequests/login');


//port number to listen
const port = 5000;

//init
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use("/mobile",mobileapp);
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
        httpOnly: true, //used this for security reasons...
      });
      //use function to send all dashboard data
      res.send("logged in");
    }
  });
});

app.use(validateCookiesfunc);
app.use("/patient", patient);
app.use("/doctor", doctor);
app.use('/caretaker', caretaker);

//return data for user dashboard
app.get("/dashboard", (req, res) => {
  // const resp = jwt.getjwt(req, res);
  // console.log("dashboard = "+resp);
  // if(resp===undefined){
  //   return
  // }
  const userid = req.userid;
  res.send("hello page!");
});


app.get('/test',(req,res)=>{
  console.log("user i  ===",req.userid)
});


//respond for other unused pages
app.get('*', function(req, res){
  res.sendStatus(404)
  // res.send('Sorry, this is an invalid URL.');
});
