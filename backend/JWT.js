const jwt = require("jsonwebtoken");
const secret_key = "thisisthesecretkeydontforgettochangeit"

const createToken = (user) => {
  
  const accessToken = jwt.sign(
    user,
    secret_key
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated!" });
  }
  try {
    const validToken = jwt.verify(accessToken,secret_key);
    if(validToken){
    }
  } catch (error) {}
};

module.exports = { createToken };
