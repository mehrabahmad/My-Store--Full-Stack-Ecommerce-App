import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, "secretjwtkey");

      // ✅ Fetch full user
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token failed or expired" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};

export default protect;

// import jwt from "jsonwebtoken";

// const protect = (req, res, next) => {
//   let token = req.headers.authorization;

//   if (token && token.startsWith("Bearer ")) {
//     try {
//       token = token.split(" ")[1];
//       const decoded = jwt.verify(token, "secretjwtkey");
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: "Token failed or expired" });
//     }
//   } else {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }
// };

// export default protect;
