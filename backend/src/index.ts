import express from "express";
import morgan from "morgan";
import { PORT } from "../src/constants";

import formRouter from "../src/routes/formRouter";
import authRouter from "../src/routes/authRouter";

import auth from "../src/middlewares/auth";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/forms", auth, formRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Backend: http://localhost:${PORT}`);
});
