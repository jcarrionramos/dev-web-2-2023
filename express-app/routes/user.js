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
  res.render("user/create_user");
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.email });

  if (!currentUser || currentUser.password !== req.body.password) {
    res.redirect("login");
    return;
  }

  const payload = currentUser["_doc"];
  delete payload.password;
  const signedJWT = jwt.sign(payload, process.env.JWT_PASSWORD, {
    expiresIn: "1h",
  });

  res.cookie("jwt", signedJWT).redirect("list_all");
});

router.get("/list_all", jwtAuthenticated, async (req, res) => {
  const users = await User.find({});
  res.render("user/list_all", {
    allUsers: users.map((current) => {
      return {
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
