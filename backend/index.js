const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const db = require("./database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { createToken } = require("./JWT.js");

//port number to listen
const port = 5000;
//init
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//initializing
app.listen(port, () => {
  console.log("Server starten to listen...");
});

//home page
app.get("/", function (req, res) {
  res.send("Only accepting GET and POST requests!");
});

// app.post("/auth", function (req, res) {
//   const mailid = req.body.mailid;
//   const password = req.body.password;
//   const resul = db.authoriseuser(username, password, (err, result) => {
//     if (err) console.log(err);
//     acces = result;
//     console.log(acces);
//     res.send({
//       access: acces,
//       user: rep,
//     });
//   });
//   res.send(resul);
// });

// app.post("/newuser", function (req, res) {
//   const mailid = req.body.mailid;
//   const password = req.body.password;
//   const phoneno = req.body.phoneno;
//   const address = req.body.address;
//   const medical_condition = req.body.medical_condition;
//   const caretakerid = req.body.caretakerid;
// });

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = { email, password, id: 12 };

  // check db find whether the user exist or not
  // const user = await Users.findOne();

  if (!user) {
    res.status(400).json("User does not exist");
  }

  // if user exist, fetch hash value stored in password section of the db
  // const dbPass = user.password;
  // temp
  const dbPass = "321321321";

  bcrypt.compare(password, dbPass).then((match) => {
    console.log(match);
    if (!match) {
      res.status(400).json({ error: "wrong email and password combinations" });
    } else {
      const accessToken = createToken(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });
      res.json("logged in");
    }
  });
});
