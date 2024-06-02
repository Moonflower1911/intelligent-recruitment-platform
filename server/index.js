
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const jobSeekerRoutes = require("./routes/jobSeekerRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const UserJobSeekerRoutes = require("./routes/UserJobSeekerRoutes");
const UserRecruiterRoutes = require("./routes/UserRecruiterRoutes");
const InterestRoutes = require("./routes/InterestRoutes");
const AdminRoutes = require("./routes/AdminRoutes");

app.use("/jobseeker", jobSeekerRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/authJobSeeker", UserJobSeekerRoutes );
app.use("/authRecruiter", UserRecruiterRoutes );
app.use("/interest", InterestRoutes );
app.use("/admin", AdminRoutes );


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});