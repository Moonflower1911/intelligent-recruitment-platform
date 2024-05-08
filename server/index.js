// app.js
const express = require("express");
const app = express();

app.use(express.json());
const db = require("./models");

// Routers
const jobSeekerRoutes = require("./routes/jobSeekerRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");

app.use("/jobseeker", jobSeekerRoutes);
app.use("/recruiter", recruiterRoutes);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});


