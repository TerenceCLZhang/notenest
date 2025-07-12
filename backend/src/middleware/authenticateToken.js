const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorised access." });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
