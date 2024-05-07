const express = require('express');
const router = express.Router();
const { JobSeekerForm } = require("../models");


router.get('/',(req,res)=>{
    res.json("Hello World");
});

router.post("/",async(req,res)=>{
    const form = req.body;
    await JobSeekerForm.create(form);
    res.json(form);
});

module.exports = router;