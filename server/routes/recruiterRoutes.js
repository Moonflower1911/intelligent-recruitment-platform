// routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const { RecruiterForm, UserRecruiter,UserJobSeeker,Interest, JobSeekerForm,  } = require('../models');
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

router.get('/interest/byOfferId/:offerId', async (req, res) => {
  const offerId = req.params.offerId;
  const interests = await Interest.findAll({ where: { OfferId: offerId } });
  res.json(interests);
});

// Fetch job seeker details by job seeker ID
router.get('/jobseeker/byId/:id', async (req, res) => {
  const id = req.params.id;
  const jobSeeker = await UserJobSeeker.findByPk(id);
  res.json(jobSeeker);
});
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

router.delete("/:id", validateToken, async (req, res) => {
  const jobOfferId = req.params.id;
  const jobOffer = await RecruiterForm.findOne({ where: { id: jobOfferId, UserRecruiterId: req.user.id } });
  if (!jobOffer) {
      return res.status(404).json({ error: "Job offer not found or you don't have permission to delete it" });
  }
  await jobOffer.destroy();
  res.json({ message: "Job offer deleted successfully" });
});

router.get("/:OfferId", validateToken, async (req, res) => {
  const recruiterId = req.user.id;
  const OfferId = req.params.OfferId;
  console.log("Recruiter ID:", recruiterId);

  try {
    const interests = await Interest.findAll({
      where: { OfferId: OfferId },
      include: [
        {
          model: JobSeekerForm,
          include: [{ model: UserJobSeeker }],
        },
      ],
    });

    const jobSeekers = interests.map((interest) => interest.JobSeekerForm);
    console.log("Job Seekers:", jobSeekers);
    res.json(jobSeekers);
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    res.status(500).json({ error: "Failed to fetch interested job seekers" });
  }
});

////






module.exports = router;