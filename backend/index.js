const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createToken } = require("./JWT.js");
const mobileapp = require('./apprequests/login');

//port number to listen
const port = 5000;

//initialize
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/mobile",mobileapp);


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

//login the user
app.post("/login", async (req, res) => {
  const email  = req.body.email;
  const user = req.body.user;
  const password = req.body.password;
  console.log(user, email)
  const cooki = req.cookies["access-token"];
  console.log(cooki);

  const rest = db.authorise(user,password,(err,result)=>
  {
    if(err) console.log(err);
    if(result.access==="denied")
    {
      res.status(400).json({ error: "wrong email and password combinations" });
    }
    else
    {
      const id = result.userid;
      const accessToken = createToken(id);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true
      });
      res.json("logged in");
    }
  })
});


//respond for other unused pages
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});
