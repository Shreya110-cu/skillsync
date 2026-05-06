const express = require("express");

const protect =
  require("../middleware/authMiddleware");

const recruiterOnly =
  require("../middleware/roleMiddleware");

const {
  createJob,
  getAllJobs
} = require(
  "../controllers/jobController"
);

const router =
  express.Router();


// public
router.get(
  "/",
  getAllJobs
);


// recruiter only
router.post(
  "/",
  protect,
  recruiterOnly,
  createJob
);

module.exports =
  router;