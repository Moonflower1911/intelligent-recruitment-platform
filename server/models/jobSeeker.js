module.exports = (sequelize, DataTypes) => {
    const JobSeekerForm = sequelize.define("JobSeekerForm", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        formations: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experiences: {
            type: DataTypes.STRING,
        },
        projetsAcademiques: {
            type: DataTypes.STRING,
        },
        langues: {
            type: DataTypes.STRING,
            allowNull: false
        },
        langages:{
            type: DataTypes.STRING,
        },
        logiciels:{
            type: DataTypes.STRING,
        },
    });
    return JobSeekerForm;
};
