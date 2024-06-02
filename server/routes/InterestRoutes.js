const express = require('express');
const router = express.Router();
const { Interest, JobSeekerForm, RecruiterForm, UserJobSeeker, UserRecruiter } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/", validateToken, async (req, res) => {
    const { OfferId } = req.body;
    const UserJobSeekerId = req.user.id;

    if (!OfferId) {
        return res.status(400).json({ error: "L'ID de l'offre est requis" });
    }

    try {
        // Vérifie si le chercheur d'emploi a un CV
        const jobSeekerForm = await JobSeekerForm.findOne({ where: { UserJobSeekerId: UserJobSeekerId } });

        if (!jobSeekerForm) {
            return res.status(400).json({ error: "Vous devez créer un CV avant de manifester un intérêt pour une offre d'emploi" });
        }

        // Vérifie si le chercheur d'emploi a déjà manifesté un intérêt pour cette offre
        const existingInterest = await Interest.findOne({ where: { OfferId: OfferId, UserJobSeekerId: UserJobSeekerId } });

        if (existingInterest) {
            return res.status(400).json({ error: "Vous avez déjà manifesté un intérêt pour cette offre d'emploi" });
        }

        const interest = await Interest.create({ OfferId: OfferId, UserJobSeekerId: UserJobSeekerId });
        res.json(interest);
    } catch (error) {
        console.error("Erreur lors de la création de l'intérêt :", error);
        res.status(500).json({ error: "Échec de la manifestation d'intérêt" });
    }
});

router.delete("/:OfferId", validateToken, async (req, res) => {
    const OfferId = req.params.OfferId;
    const UserJobSeekerId = req.user.id;

    try {
        // Vérifie si l'intérêt existe
        const interest = await Interest.findOne({ where: { OfferId: OfferId, UserJobSeekerId: UserJobSeekerId } });

        if (!interest) {
            return res.status(404).json({ error: "Intérêt non trouvé" });
        }

        await interest.destroy();
        res.json({ message: "Intérêt retiré avec succès !" });
    } catch (error) {
        console.error("Erreur lors du retrait de l'intérêt :", error);
        res.status(500).json({ error: "Échec du retrait de l'intérêt" });
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


