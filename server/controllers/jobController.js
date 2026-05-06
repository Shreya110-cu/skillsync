const Job =
  require("../models/Job");


// CREATE JOB
const createJob = async (
  req,
  res
) => {

  try {

    const {
      title,
      company,
      location,
      skillsRequired
    } = req.body;

    const job =
      await Job.create({

        title,
        company,
        location,
        skillsRequired,

        createdBy:
          req.user.id

      });

    res.status(201).json({

      message:
        "Job created successfully",

      job

    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};


// GET ALL JOBS
const getAllJobs = async (
  req,
  res
) => {

  try {

    const jobs =
      await Job.find()
        .populate(
          "createdBy",
          "name email"
        );

    res.status(200).json(
      jobs
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};


module.exports = {

  createJob,
  getAllJobs

};