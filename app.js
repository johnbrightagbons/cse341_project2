const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect("mongodb://localhost:27017/schoolDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
