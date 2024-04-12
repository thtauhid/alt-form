import express from "express";
import morgan from "morgan";
import { PORT } from "../src/constants";

import formRouter from "../src/routes/formRouter";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/forms", formRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
