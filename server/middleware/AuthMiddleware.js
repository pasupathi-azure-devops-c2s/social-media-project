import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTKEY;

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, secret); // Verify the token
      req.body._id = decoded?.id; // Attach user ID to the request body
    }
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(403).json("Invalid or expired token."); // 403 if token is invalid
  }
};

export default authMiddleWare;
