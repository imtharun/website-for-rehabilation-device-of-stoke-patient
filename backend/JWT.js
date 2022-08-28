const jwt = require("jsonwebtoken");
const secret_key = "thisisthesecretkeydontforgettochangeit" //change the secret key

const createToken = (user) => {
  const accessToken = jwt.sign(
    user,
    secret_key
  );
  return accessToken;
};

const validateUser = (req, res) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated!" });
  }
  try {
    const validToken = jwt.verify(accessToken,secret_key);
    if(validToken){
      res.send("user is validated")
    }
    else{
      res.send("Invalid token user not authenticated!")
    }
  } catch (error) {}
};

function getTokendata(req,callback)
{
  const accessToken = req.cookies["access-token"];
  if(!accessToken){
    callback();
  }
  else{
    const tokendata = jwt.verify(accessToken,secret_key);
    if(tokendata){
      callback(tokendata);
    }
  }
}

module.exports = { createToken ,
  validateUser,
  getTokendata,
   };
