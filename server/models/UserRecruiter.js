const RecruiterForm = require("./recruiter");

module.exports = (sequelize, DataTypes) => {
    const UserRecruiter = sequelize.define("UserRecruiter", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    

    UserRecruiter.associate = (models) => {
        UserRecruiter.hasMany(models.RecruiterForm, {
            foreignKey: 'UserRecruiterId',
            onDelete: 'CASCADE'
        });
    };

    return UserRecruiter;
};
