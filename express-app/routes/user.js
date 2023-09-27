import express from "express";

const router = express.Router();

router.get("/user", (req, res) => {
  res.send("crear usuario");
});

export default router;
