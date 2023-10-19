import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/create", (req, res) => {
  res.render("user/create_user");
});

router.post("/create", (req, res) => {
  User.create(req.body);
  res.render("user/create_user");
});

router.get("/list_all", async (req, res) => {
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
