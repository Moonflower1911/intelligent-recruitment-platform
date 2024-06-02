// routes/jobSeekerRoutes.js
const express = require('express');
const router = express.Router();
const { sequelize, JobSeekerForm, Interest, UserJobSeeker } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get("/", async (req, res) => {
  const listJobSeeker = await JobSeekerForm.findAll();
  res.json(listJobSeeker);
});

router.get('/account', validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserJobSeeker.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const resume = await JobSeekerForm.findAll({ where: { UserJobSeekerId: userId } });
    res.json({ user, resume });
  } catch (error) {
    console.error('Error fetching recruiter data:', error);
    res.status(500).json({ error: 'Failed to fetch recruiter data' });
  }
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const cv = await JobSeekerForm.findByPk(id);
  res.json(cv);
})

router.post('/', validateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if the user already has a CV
    const existingCV = await JobSeekerForm.findOne({ where: { UserJobSeekerId: userId } });
    if (existingCV) {
      return res.json({ error: 'You already have a CV' });
    }

    // If no existing CV, create a new one
    const { nom, prenom, email, phoneNumber, address, formations, experiences, projetsAcademiques, langues, langages, logiciels } = req.body;
    const username = req.user.username;
    const UserJobSeekerId = req.user.id;

    const newResume = await JobSeekerForm.create({
      nom,
      prenom,
      email,
      phoneNumber,
      address,
      formations,
      experiences,
      projetsAcademiques,
      langues,
      langages,
      logiciels,
      username,
      UserJobSeekerId
    });

    res.json(newResume);
  } catch (error) {
    console.error('Error creating a resume:', error);
    res.status(500).json({ error: 'Failed to create your resume' });
  }
});


router.delete("/:id", validateToken, async (req, res) => {
  const resumeId = req.params.id;

  const resume = await JobSeekerForm.findOne({
    where: { id: resumeId, UserJobSeekerId: req.user.id }
  });

  if (!resume) {
    return res.status(404).json({ error: "Job resume not found or you don't have permission to delete it" });
  }

  await sequelize.transaction(async (transaction) => {
    await resume.destroy({ transaction });
  });

  res.json({ message: "Job resume deleted successfully" });
});


module.exports = router;