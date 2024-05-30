// routes/jobSeekerRoutes.js
const express = require('express');
const router = express.Router();
const { JobSeekerForm } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get("/",async(req,res)=>{
  const listJobSeeker= await JobSeekerForm.findAll();
  res.json(listJobSeeker);
});

router.get('/byId/:id', async(req,res)=>{
  const id = req.params.id;
  const cv  = await JobSeekerForm.findByPk(id);
  res.json(cv);
})

router.post("/", validateToken ,async (req, res) => {
  const form = req.body;
  await JobSeekerForm.create(form);
  res.json(form);
});

module.exports = router;