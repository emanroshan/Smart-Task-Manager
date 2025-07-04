const jwt = require("jsonwebtoken");
const SECRET = "your_secret_key_here";

module.exports = function (req, res, next) {
  const header = req.headers.authorization;
  console.log("HEADER:", header);

  if (!header) {
    console.log("No Authorization header!");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("DECODED:", decoded);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
