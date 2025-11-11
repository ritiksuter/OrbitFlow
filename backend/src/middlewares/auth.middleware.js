import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
     const authHeader = req.headers.authorization;

    // Check if the header exists and starts correctly
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } 
  catch (error) {
    console.log("Auth Middleware Error : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;