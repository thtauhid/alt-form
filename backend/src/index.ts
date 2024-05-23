import express from "express";
import morgan from "morgan";
import { PORT } from "./constants";

import formRouter from "./routes/formRouter";
import authRouter from "./routes/authRouter";
import aiRouter from "./routes/aiRouter";

import auth from "./middlewares/auth";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/forms", formRouter);
app.use("/auth", authRouter);
app.use("/ai", auth, aiRouter);

app.listen(PORT, () => {
  console.log(`Backend: http://localhost:${PORT}`);
});
