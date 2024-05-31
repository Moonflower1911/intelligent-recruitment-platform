const JobSeekerForm = require("./jobSeeker");

module.exports = (sequelize, DataTypes) => {
    const UserJobSeeker = sequelize.define("UserJobSeeker", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    UserJobSeeker.associate = (models) => {
        UserJobSeeker.hasOne(models.JobSeekerForm, {
            onDelete: "cascade"
        });
    };

    return UserJobSeeker;
};
