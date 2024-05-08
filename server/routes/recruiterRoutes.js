// routes/jobSeekerRoutes.js
const express = require('express');
const router = express.Router();
const { RecruiterForm } = require('../models');

router.get("/",(req,res)=>{
  res.json("Hello World");
});

router.post("/", async (req, res) => {
  const form = req.body;
  await RecruiterForm.create(form);
  res.json(form);
});

module.exports = router;
