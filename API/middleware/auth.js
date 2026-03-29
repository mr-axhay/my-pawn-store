import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = { id: decoded.id };

    next();

  } catch (err) {
    console.log("ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default authMiddleware;