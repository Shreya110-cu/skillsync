const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const app = express();
const applicationRoutes =
  require(

    "./routes/applicationRoutes"

  );
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use(

  "/api/applications",

  applicationRoutes

);
app.get("/", (req, res) => {
  res.json({
    message: "SkillSync API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const jobRoutes =
  require("./routes/jobRoutes");

app.use(
  "/api/jobs",
  jobRoutes
);