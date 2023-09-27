import { app } from "./app.js";

import mainRouter from "./routes/main.js";
import userRouter from "./routes/user.js";

const port = 3000;

app.use("", mainRouter);
app.use("", userRouter);

app.get("/health", (req, res) => {
  res.send("I'M ALIVE");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
