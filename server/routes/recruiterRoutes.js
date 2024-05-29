// routes/jobSeekerRoutes.js
const express = require("express");
const router = express.Router();
const { RecruiterForm } = require('../models');

router.get("/",async(req,res)=>{
  const listRecruiter= await RecruiterForm.findAll();
  res.json(listRecruiter);
});

router.get('/byId/:id',async(req,res)=>{
  const id =req.params.id ;
  const jobOffer = await RecruiterForm.findByPk(id);
  res.json(jobOffer);
})

router.post("/", async (req, res) => {
  const form = req.body;
  await RecruiterForm.create(form);
  res.json(form);
});

module.exports = router;
