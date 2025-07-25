const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the "Authorization" header (format: "Bearer <token>")
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token part

  if (!token) {
    return res.status(401).json({ error: "Unauthorised access." }); // No token provided
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Invalid token." }); // Token invalid or expired
    }

    // Attach user payload to request object for downstream use
    req.user = user;
    next(); // Continue to protected route
  });
};

module.exports = authenticateToken;
