import express from "express";
import * as handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

const cors = require("cors");

const app = express();

dotenv.config();

app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    defaultLayout: "index",
  })
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(process.env.URL_MONGO)
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch((error) => {
    console.error(`Connection refuse: ${error}`);
  });

export { app };
