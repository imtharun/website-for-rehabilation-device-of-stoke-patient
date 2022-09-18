const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("./Helper/JWT.js");
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

app.get("/logout", (req, res) => {
  return res.sendStatus(200);
});

//login the user
app.post("/login", async (req, res) => {
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
      res.send("logged in");
    }
  });
});



//checking if jwt token is valid or not
// app.post('/checkjwt',(req,res)=>{
//   const val = jwt.validateUser(req,res)
//   res.send(val)
// })

//this is to add user data after checking the data in the jwt token
app.post("/addusrdata", (req, res) => {
  const id = jwt.getjwt(req, res);
});

//return data for user dashboard
app.get("/dashboard", (req, res) => {
  const resp = jwt.getjwt(req, res);
  console.log("dashboard = "+resp);
  if(resp===undefined){
    return
  }
  res.send("hello page!");
});

//return data for user to check data of recent sessions
app.get('/recentsessions',(req,res)=>{
  const resp = jwt.getjwt(req, res);
  console.log("dashboard = "+resp);
  if(resp===undefined){
    console.log("returning");
    return
  }
  res.send("recent sessions....");
  console.log("====================================");
  console.log(resp);
  console.log("====================================");
});

//respond for other unused pages
app.get('*', function(req, res){
  res.sendStatus(404)
  // res.send('Sorry, this is an invalid URL.');
});
