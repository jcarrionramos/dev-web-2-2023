import express from "express";
import jwtAuthenticated from "../helpers/jwtAuthenticated";
import getCurrentUser from "../helpers/getCurrentUser";

const router = express.Router();

router.get("/home", jwtAuthenticated, async (req, res) => {
  const currentUser = await getCurrentUser(req);
  res.json({ user: currentUser });
});

export default router;
