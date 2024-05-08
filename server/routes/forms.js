const express = require("express");
const router = express.Router();
const db = require("../models");
const { JobSeekerForm, RecruiterForm } = require("../models/forms");

// Route to handle job seeker form submissions
router.post("/jobseeker", async (req, res) => {
  try {
    const jobSeekerData = req.body;
    const createdJobSeeker = await JobSeekerForm.create(jobSeekerData);
    res.status(201).json(createdJobSeeker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to handle recruiter form submissions
router.post("/recruiter", async (req, res) => {
  try {
    const recruiterData = req.body;
    const createdRecruiter = await RecruiterForm.create(recruiterData);
    res.status(201).json(createdRecruiter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
