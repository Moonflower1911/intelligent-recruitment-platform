// routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const { RecruiterForm, UserRecruiter } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get("/", async (req, res) => {
  const listRecruiter = await RecruiterForm.findAll();
  res.json(listRecruiter);
});

router.get('/account', validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserRecruiter.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const jobOffers = await RecruiterForm.findAll({ where: { UserRecruiterId: userId } });
    res.json({ user, jobOffers });
  } catch (error) {
    console.error('Error fetching recruiter data:', error);
    res.status(500).json({ error: 'Failed to fetch recruiter data' });
  }
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const jobOffer = await RecruiterForm.findByPk(id);
  res.json(jobOffer);
})

router.post('/', validateToken, async (req, res) => {
  try {
    const { nomEntreprise, address, city, poste, description, experience, formations, skills, keywords, langues } = req.body;
    const UserRecruiterId = req.user.id;
    const username = req.user.username;

    const newJobOffer = await RecruiterForm.create({
      nomEntreprise,
      address,
      city,
      poste,
      description,
      experience,
      formations,
      skills,
      keywords,
      langues,
      username,
      UserRecruiterId
    });

    res.json(newJobOffer);
  } catch (error) {
    console.error('Error creating job offer:', error);
    res.status(500).json({ error: 'Failed to create job offer' });
  }
});

module.exports = router;
