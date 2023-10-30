import jwt from "jsonwebtoken";

const jwtAuthenticated = (req, res, next) => {
  const cookie = req.cookies["jwt"];

  if (!cookie) {
    res.redirect("/user/login");
    return;
  }

  try {
    jwt.verify(cookie, process.env.JWT_PASSWORD);
    next();
  } catch (error) {
    console.log("error", error);
    res.redirect("/user/login");
  }
};

export default jwtAuthenticated;
