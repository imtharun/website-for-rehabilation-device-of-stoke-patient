const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = jwt.sign(
    { email: user.email, id: user.id },
    "secret-key"
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated!" });
  }

  try {
    const validToken = jwt.verify(accessToken, "secret-key");
    
    if(validToken){
        
    }
  } catch (error) {}
};

module.exports = { createToken };
