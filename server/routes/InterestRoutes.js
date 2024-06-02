const express = require('express');
const router = express.Router();
const { Interest, JobSeekerForm, RecruiterForm, UserJobSeeker, UserRecruiter } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/", validateToken, async (req, res) => {
    const { OfferId } = req.body;
    const UserJobSeekerId = req.user.id;

    if (!OfferId) {
        return res.status(400).json({ error: "OfferId est requis" });
    }

    try {
        // Vérifiez si le chercheur d'emploi a un CV
        const jobSeekerForm = await JobSeekerForm.findOne({ where: { UserJobSeekerId: UserJobSeekerId } });

        if (!jobSeekerForm) {
            return res.status(400).json({ error: "Vous devez créer un CV avant de montrer de l'intérêt pour une offre d'emploi." });
        }

        const interest = await Interest.create({ OfferId: OfferId, UserJobSeekerId: UserJobSeekerId });
        res.json(interest);
    } catch (error) {
        console.error("Erreur lors de la création de l'intérêt:", error);
        res.status(500).json({ error: "Échec de la création de l'intérêt" });
    }
});

router.get('/', validateToken, async (req, res) => {
    const recruiterId = req.user.id;
    console.log("Recruiter ID:", recruiterId); // Log recruiterId for debugging

    try {
        const recruiterForms = await RecruiterForm.findAll({ where: { UserRecruiterId: recruiterId } });
        const offerIds = recruiterForms.map(form => form.id);

        console.log("Offer IDs:", offerIds); // Log offerIds for debugging

        const interests = await Interest.findAll({
            where: { OfferId: offerIds },
            include: [
                {
                    model: JobSeekerForm,
                    include: [{ model: UserJobSeeker }]
                }
            ]
        });

        const jobSeekers = interests.map(interest => interest.JobSeekerForm);
        console.log("Job Seekers:", jobSeekers);
        res.json(jobSeekers);
    } catch (error) {
        console.error("Error fetching job seekers:", error);
        res.status(500).json({ error: "Failed to fetch interested job seekers" });
    }
});

router.get('/:OfferId', validateToken, async (req, res) => {
    const recruiterId = req.user.id;
    const OfferId = req.params.OfferId;
    console.log("Recruiter ID:", recruiterId); // Log recruiterId for debugging

    try {
        const interests = await Interest.findAll({
            where: { OfferId: OfferId },
            include: [
                {
                    model: JobSeekerForm,
                    include: [{ model: UserJobSeeker }]
                }
            ]
        });

        const jobSeekers = interests.map(interest => interest.JobSeekerForm);
        console.log("Job Seekers:", jobSeekers);
        res.json(jobSeekers);
    } catch (error) {
        console.error("Error fetching job seekers:", error);
        res.status(500).json({ error: "Failed to fetch interested job seekers" });
    }
});





module.exports = router;


