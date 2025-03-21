import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== "admin") {
      // Check if the user has 'admin' role
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token or expired token" });
  }
};

export const verifyToken = async (req, res, next) => {
  if (req.path === "/api/admin/admin-setup") {
    return next(); // Skip token check for admin registration
  }
  //Get token from authorizd header
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Access token required" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    //Attach the decode user info to the request object
    req.user = decoded;
    next();
  });
};

// export const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden - Access Denied" });
//     }
//     next();
//   };
// };
