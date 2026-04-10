import express from "express";
import router from "./api/employees.js";

const app = express();

// 1. Body-parsing middleware
app.use(express.json());

// 2. Mount your router
app.use("/", router);

// 3. Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

export default app;
