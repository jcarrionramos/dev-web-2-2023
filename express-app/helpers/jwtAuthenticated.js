import jwt from "jsonwebtoken";

const jwtAuthenticated = (req, res, next) => {
  const authJwt = req.headers.authorization;

  if (!authJwt) {
    res.json({ success: false, message: "acceso denegado" });
    return;
  }

  try {
    jwt.verify(authJwt, process.env.JWT_PASSWORD);
    next();
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: "acceso denegado" });
  }
};

export default jwtAuthenticated;
