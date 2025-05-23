// routes/jobSeekerRoutes.js
const express = require('express');
const router = express.Router();
const { sequelize, JobSeekerForm, Interest, UserJobSeeker, RecruiterForm } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/cvs');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['application/pdf', 'video/mp4', 'video/webm', 'video/ogg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF ou vidéo sont autorisés'), false);
    }
  },
});



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

router.post('/', validateToken, upload.single('cvFile'), async (req, res) => {
  try {
    const userId = req.user.id;

    const existingCV = await JobSeekerForm.findOne({ where: { UserJobSeekerId: userId } });
    if (existingCV) {
      return res.json({ error: 'You already have a CV' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'CV file is required' });
    }

    const { nom, prenom, email, phoneNumber, address } = req.body;
    const username = req.user.username;
    const cvFilePath = req.file.path;

    const newResume = await JobSeekerForm.create({
      nom,
      prenom,
      email,
      phoneNumber,
      address,
      username,
      UserJobSeekerId: userId,
      cvFilePath,
    });

    res.json(newResume);
  } catch (error) {
    console.error('Error creating a resume:', error);
    res.status(500).json({ error: 'Failed to create your resume' });
  }
});

router.put('/:id', validateToken, upload.single('cvFile'), async (req, res) => {
  try {
    const resumeId = req.params.id;
    const userId = req.user.id;

    const resume = await JobSeekerForm.findOne({
      where: { id: resumeId, UserJobSeekerId: userId }
    });

    if (!resume) {
      return res.status(404).json({ error: "CV non trouvé ou accès refusé" });
    }

    const { nom, prenom, email, phoneNumber, address } = req.body;
    const updatedFields = { nom, prenom, email, phoneNumber, address };

    if (req.file) {
      updatedFields.cvFilePath = req.file.path;

      // Optional: delete old file from disk
      if (resume.cvFilePath && fs.existsSync(resume.cvFilePath)) {
        fs.unlink(resume.cvFilePath, (err) => {
          if (err) console.warn("Erreur suppression ancien CV:", err.message);
        });
      }
    }

    await resume.update(updatedFields);

    res.json({ message: "CV mis à jour", resume });
  } catch (error) {
    console.error("Erreur mise à jour CV:", error);
    res.status(500).json({ error: "Erreur interne" });
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

router.get('/myApplications', validateToken, async (req, res) => {
  const { id } = req.user; // assuming your token gives you user id

  try {
    const interests = await Interest.findAll({
      where: { UserJobSeekerId: id },
      include: [{
        model: RecruiterForm
      }]
    });

    const offers = interests.map(interest => interest.RecruiterForm);

    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des candidatures." });
  }
});


router.put('/video/:id', validateToken, upload.single('videoFile'), async (req, res) => {
  try {
    const resumeId = req.params.id;
    const userId = req.user.id;

    const resume = await JobSeekerForm.findOne({
      where: { id: resumeId, UserJobSeekerId: userId }
    });

    if (!resume) {
      return res.status(404).json({ error: "CV introuvable ou non autorisé." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier vidéo reçu." });
    }

    // Delete the old video if it exists
    if (resume.videoFilePath && fs.existsSync(resume.videoFilePath)) {
      fs.unlinkSync(resume.videoFilePath);
    }

    resume.videoFilePath = req.file.path;
    await resume.save();

    res.json({ message: "Vidéo mise à jour avec succès", videoFilePath: resume.videoFilePath });
  } catch (error) {
    console.error("Erreur lors de l'upload vidéo:", error);
    res.status(500).json({ error: "Échec de l'upload de la vidéo." });
  }
});

router.delete('/video/:id', validateToken, async (req, res) => {
  try {
    const resumeId = req.params.id;
    const userId = req.user.id;

    const resume = await JobSeekerForm.findOne({
      where: { id: resumeId, UserJobSeekerId: userId }
    });

    if (!resume || !resume.videoFilePath) {
      return res.status(404).json({ error: "Aucune vidéo à supprimer." });
    }

    if (fs.existsSync(resume.videoFilePath)) {
      fs.unlinkSync(resume.videoFilePath);
    }

    resume.videoFilePath = null;
    await resume.save();

    res.json({ message: "Vidéo supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la vidéo:", error);
    res.status(500).json({ error: "Échec de la suppression de la vidéo." });
  }
});

router.get('/recommendations', validateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔍 Récupérer les infos du chercheur d’emploi
    const jobSeekerData = await JobSeekerForm.findOne({
      where: { UserJobSeekerId: userId },
    });

    if (!jobSeekerData) {
      return res.status(404).json({ error: 'Profil chercheur d’emploi non trouvé' });
    }

    const { cvFilePath, videoFilePath } = jobSeekerData;

    console.log("📤 Sending to Python:");
    console.log("CV:", cvFilePath);
    console.log("Video:", videoFilePath);

    if (!cvFilePath) {
      return res.status(400).json({ error: 'CV manquant' });
    }

    // 📡 Appel au moteur Python avec ou sans vidéo
    const payload = {
      cv_path: cvFilePath,
      ...(videoFilePath && { video_path: videoFilePath })  // inclure seulement si défini
    };

    const response = await axios.post('http://localhost:5000/analyze', payload);
    console.log(response.data)

    // ✅ Retourner la liste des offres triées
    res.json({ recommendedOffers: response.data });

  } catch (error) {
    console.error('Erreur moteur de recommandation :', error.response?.data || error.message, error.stack);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
});




module.exports = router;