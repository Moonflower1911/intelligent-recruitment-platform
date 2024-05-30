const recruiter = require("./jobSeeker");

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
        recruiter.associate = (models) => {
            UserRecruiter.hasMany(models.recruiter,{
                onDelete : "cascade"
            });
        };
    
    return UserRecruiter;
};
