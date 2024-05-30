const jobSeeker = require("./jobSeeker");

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
    jobSeeker.associate = (models) => {
        UserJobSeeker.hasOne(models.jobSeeker, {
            onDelete: "cascade"
        });
    };

    return UserJobSeeker;
};
