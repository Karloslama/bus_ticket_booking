import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};