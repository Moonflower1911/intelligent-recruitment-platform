// routes/jobSeekerRoutes.js
const express = require('express');
const router = express.Router();
const { JobSeekerForm } = require('../models');

router.get("/",async(req,res)=>{
  const listOfJobSeekerForms= await JobSeekerForm.findAll();
  res.json(listOfJobSeekerForms);
});

router.post("/", async (req, res) => {
  const form = req.body;
  await JobSeekerForm.create(form);
  res.json(form);
});

module.exports = router;
