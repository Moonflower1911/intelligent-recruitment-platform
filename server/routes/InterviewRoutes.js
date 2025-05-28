const express = require('express');
const router = express.Router();
const { Interview, UserRecruiter, Interest,JobSeekerForm } = require('../models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { validateToken } = require('../middlewares/AuthMiddleware');
const db = require("../models");
const sequelize = db.sequelize;



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/interviews');
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

//ajouter un entretien

router.post('/:interestId', validateToken, upload.single('videoFile'), async (req, res) => {
  try {
    const interestId = req.params.interestId;
    const recruiterId = req.user.id;

    // 🟡 req.body fields come in as strings in multipart/form-data
    const {
      date,
      notes,
      communication_score,
      technical_score,
      motivation_score
    } = req.body;

    const video_path = req.file ? req.file.path : null;

    const interest = await Interest.findByPk(interestId);
    const recruiter = await UserRecruiter.findByPk(recruiterId);

    if (!interest || !recruiter) {
      return res.status(400).json({ error: 'Invalid interestId or recruiterId' });
    }

    const interview = await Interview.create({
      date,
      interestId,
      recruiterId,
      notes,
      communication_score: parseInt(communication_score),
      technical_score: parseInt(technical_score),
      motivation_score: parseInt(motivation_score),
      video_path
    });

    res.status(201).json(interview);
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ error: error.message });
  }
});



//trouver si une interet a passé un entretien
router.get('/status/:interestId', async (req, res) => {
  try {
    const { interestId } = req.params;

    const existing = await Interview.findOne({
      where: { interestId: interestId }
    });

    if (existing) {
      return res.status(200).json({ interviewed: true, interviewId: existing.id });
    } else {
      return res.status(200).json({ interviewed: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//ajouter une video à un entretien
router.put('/video/:id', validateToken, upload.single('videoFile'), async (req, res) => {
  try {
    const interviewId = req.params.id;

    const interview = await Interview.findOne({
      where: { id: interviewId }
    });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No video file received." });
    }

    // Delete old video if it exists
    if (interview.video_path && fs.existsSync(interview.video_path)) {
      fs.unlinkSync(interview.video_path);
    }

    // Save new video path
    interview.video_path = req.file.path;
    await interview.save();

    res.json({ message: "Video updated successfully", video_path: interview.video_path });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Failed to upload video." });
  }
});


//supprimer une video d'un entretien
router.delete('/video/:id', validateToken, async (req, res) => {
  try {
    const interviewId = req.params.id;

    const interview = await Interview.findOne({
      where: { id: interviewId }
    });

    if (!interview || !interview.video_path) {
      return res.status(404).json({ error: "No video to delete." });
    }

    if (fs.existsSync(interview.video_path)) {
      fs.unlinkSync(interview.video_path);
    }

    interview.video_path = null;
    await interview.save();

    res.json({ message: "Video deleted successfully." });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Failed to delete video." });
  }
});

//Get an interview with the video
router.get('/view/:id', async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: "Error fetching interview" });
  }
});


// GET /interview/offer/:offerId
router.get("/offer/:offerId", async (req, res) => {
  try {
    const { offerId } = req.params;

    const interviews = await Interview.findAll({
      include: [
        {
          model: Interest,
          where: { OfferId: offerId },
          include: [
            {
              model: sequelize.models.JobSeekerForm, // JobSeeker details
              attributes: [
                "id",
                "prenom",
                "nom",
                "email",
                "phoneNumber",
                "cvFilePath",
                "videoFilePath"
              ]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: "Failed to fetch interviews for the offer" });
  }
});




module.exports = router;
