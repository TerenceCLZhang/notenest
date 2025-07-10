import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

// HTTP logging
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is live and listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("Hello");
  res.status(200).send("OK");
});
