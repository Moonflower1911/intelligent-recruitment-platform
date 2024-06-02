const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {Admin, JobSeekerForm, RecruiterForm, UserRecruiter, UserJobSeeker } = require('../models'); // Make sure the correct path to your models is used
const { validateToken } = require('../middlewares/AuthMiddleware');
// Route for admin login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find admin by username
        const user = await Admin.findOne({ where: { username: username } });

        // Check if admin exists
        if (!user) {
            return res.status(404).json({ error: "Admin doesn't exist" });
        }

        // Compare passwords
        if (password !== user.password) {
            return res.status(401).json({ error: "Wrong username and password combination" });
        }

        const accessToken = jwt.sign( { username :user.username,  id :user.id }, "secret");

        // Respond with success message
        res.json({ accessToken });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json('Failed to log in');
    }
});



router.get('/account', validateToken, async (req, res) => {
    try {
      const id = req.user.id; // Assumes the middleware adds user info to req.user
      const admin = await Admin.findByPk(id, {
        attributes: ['id', 'username'] // Only include id and username
      });
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      res.json({ admin });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      res.status(500).json({ error: 'Failed to fetch admin data' });
    }
  });

// Route to get all CVs
router.get('/CV', async (req, res) => {
    try {
        const listCV = await JobSeekerForm.findAll();
        res.json(listCV);
    } catch (error) {
        console.error('Error fetching CVs:', error);
        res.status(500).json('Failed to fetch CVs');
    }
});

// Route to get all job offers
router.get('/Offres', async (req, res) => {
    try {
        const listOffre = await RecruiterForm.findAll();
        res.json(listOffre);
    } catch (error) {
        console.error('Error fetching job offers:', error);
        res.status(500).json('Failed to fetch job offers');
    }
});

// Route to get all job seekers
router.get('/jobseekers', async (req, res) => {
    try {
        const listjobseekers = await UserJobSeeker.findAll({ attributes: ['id', 'username'] });
        res.json(listjobseekers);
    } catch (error) {
        console.error('Error fetching job seekers:', error);
        res.status(500).json('Failed to fetch job seekers');
    }
});

// Route to get all recruiters
router.get('/recruiters', async (req, res) => {
    try {
        const listrecruiters = await UserRecruiter.findAll({ attributes: ['id', 'username'] });
        res.json(listrecruiters);
    } catch (error) {
        console.error('Error fetching recruiters:', error);
        res.status(500).json('Failed to fetch recruiters');
    }
});

// Route to delete a CV based on ID
router.delete('/CV/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const cv = await JobSeekerForm.findByPk(id);

        if (!cv) {
            return res.status(404).json({ error: "CV not found" });
        }

        await cv.destroy();
        res.json({ message: "CV deleted successfully" });
    } catch (error) {
        console.error('Error deleting CV:', error);
        res.status(500).json('Failed to delete CV');
    }
});

// Route to delete a job offer based on ID
router.delete('/Offres/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const offer = await RecruiterForm.findByPk(id);

        if (!offer) {
            return res.status(404).json({ error: "Job offer not found" });
        }

        await offer.destroy();
        res.json({ message: "Job offer deleted successfully" });
    } catch (error) {
        console.error('Error deleting job offer:', error);
        res.status(500).json('Failed to delete job offer');
    }
});


// DELETE route to delete jobseeker and their CV
router.delete('/jobseeker/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const jobSeeker = await UserJobSeeker.findByPk(id);

        if (!jobSeeker) {
            return res.status(404).json({ error: "Job seeker not found" });
        }

        // Delete associated CV
        await JobSeekerForm.destroy({ where: { UserJobSeekerId: jobSeeker.id } });

        // Delete jobseeker
        await jobSeeker.destroy();

        res.json({ message: "Job seeker and associated CV deleted successfully" });
    } catch (error) {
        console.error('Error deleting job seeker and associated CV:', error);
        res.status(500).json('Failed to delete job seeker and associated CV');
    }
});




// Route to delete a recruiter based on ID
router.delete('/recruiter/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const recruiter = await UserRecruiter.findByPk(id);

        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found" });
        }
        await RecruiterForm.destroy({ where: { UserRecruiterId: recruiter.id } });

        await recruiter.destroy();
        res.json({ message: "Recruiter deleted successfully" });
    } catch (error) {
        console.error('Error deleting recruiter:', error);
        res.status(500).json('Failed to delete recruiter');
    }
});

//Statistics


// Endpoint to count CVs
router.get('/cv/count', async (req, res) => {
  try {
    const count = await JobSeekerForm.count();
    res.json({ count });
  } catch (error) {
    console.error('Error counting CVs:', error);
    res.status(500).json({ error: 'Failed to count CVs' });
  }
});

// Endpoint to count offers
router.get('/offer/count', async (req, res) => {
  try {
    const count = await RecruiterForm.count();
    res.json({ count });
  } catch (error) {
    console.error('Error counting offers:', error);
    res.status(500).json({ error: 'Failed to count offers' });
  }
});

// Endpoint to count users
router.get('/jobseeker/count', async (req, res) => {
  try {
    const count = await UserJobSeeker.count();
    res.json({ count });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Failed to count users' });
  }
});

router.get('/recruiter/count', async (req, res) => {
    try {
      const count = await UserJobSeeker.count();
      res.json({ count });
    } catch (error) {
      console.error('Error counting users:', error);
      res.status(500).json({ error: 'Failed to count users' });
    }
  });

// Endpoint to count all users (jobseekers + recruiters)
router.get('/users/count', async (req, res) => {
    try {
      const jobseekerCount = await UserJobSeeker.count();
      const recruiterCount = await UserRecruiter.count();
      const totalCount = jobseekerCount + recruiterCount;
  
      res.json({ totalCount });
    } catch (error) {
      console.error('Error counting users:', error);
      res.status(500).json({ error: 'Failed to count users' });
    }
  });

module.exports = router;


