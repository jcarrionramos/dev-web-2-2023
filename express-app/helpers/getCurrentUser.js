import jwt from "jsonwebtoken";

const getCurrentUser = async (req) => {
  const cookie = req.cookies["jwt"];

  if (!cookie) return null;

  try {
    const token = await jwt.verify(cookie, process.env.JWT_PASSWORD);
    return token;
  } catch (error) {
    console.log("error", error);
    null;
  }
};

export default getCurrentUser;
