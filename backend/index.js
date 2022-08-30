const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("./JWT.js");
const mobileapp = require('./apprequests/login');

//port number to listen
const port = 5000;

//init
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
  const password = req.body.password;
  const cooki = req.cookies["access-token"];
  if(!cooki===undefined)
  {
    jwt.validateUser(cooki);
  }
  const rest = db.authorise(email,password,(err,result)=>
  {
    if(err) console.log("err="+err);
    if(result.access==="denied")
    {
      res.status(400).json({ error: "wrong email and password combinations" });
    }
    else
    {
      const id = result.userid;
      const accessToken = jwt.createToken(id);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true //used this for security reasons...
      });
      res.send("logged in");
    }
  })
});

//checking the jwt token for authentication
const getjwt = (req, res)=>{
  let resp = '';
  const id = jwt.getTokendata(req,(result)=>{
    if(result){
      resp = result;
      console.log("result = "+ result);
      res.send(result); // put the data code here
    }
    else{
      console.log("else result = "+ result);
      res.sendStatus(401);
    }
  });  

  return resp;
}


//checking if jwt token is valid or not
// app.post('/checkjwt',(req,res)=>{
//   const val = jwt.validateUser(req,res)
//   res.send(val)
// })


//this is to add user data after checking the data in the jwt token
app.post('/addusrdata',(req,res)=>{
  const id = getjwt(req,res);
})


//return data for user dashboard
app.get('/dashboard',(req,res)=>{
  res = getjwt(req,res); 
})

//return data for user to check data of recent sessions
app.get('/recentseccions',(req,res)=>{
  res = getjwt(req, res);
  console.log('====================================');
  console.log(res);
  console.log('====================================');
})












//respond for other unused pages
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});


