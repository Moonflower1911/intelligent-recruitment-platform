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
        UserJobSeeker.hasMany(models.Interest, {
            foreignKey: 'UserJobSeekerId',
            onDelete: 'CASCADE'
        });
        UserJobSeeker.hasOne(models.JobSeekerForm, {
            foreignKey: 'UserJobSeekerId',
            onDelete: 'CASCADE'
        });
    };


    return UserJobSeeker;
};
