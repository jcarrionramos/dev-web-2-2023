import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import jwtAuthenticated from "../helpers/jwtAuthenticated.js";

const router = express.Router();

router.get("/create", (req, res) => {
  res.render("user/create_user");
});

router.post("/create", (req, res) => {
  User.create(req.body);
  res.json({ success: true });
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.email });

  if (!currentUser || currentUser.password !== req.body.password) {
    res.json({ success: false, message: "usuario o constraseña incorrecto" });
    return;
  }

  const payload = currentUser["_doc"];
  delete payload.password;
  const signedJWT = jwt.sign(payload, process.env.JWT_PASSWORD, {
    expiresIn: "1h",
  });

  res.json({ success: true, jwt: signedJWT });
});

router.get("/list_all", jwtAuthenticated, async (req, res) => {
  const users = await User.find({});
  res.json({
    users: users.map((current) => {
      return {
        id: current._id,
        name: current.name,
        lastName: current.lastName,
        email: current.email,
        address: current.address,
        age: current.age,
      };
    }),
  });
});

export default router;
