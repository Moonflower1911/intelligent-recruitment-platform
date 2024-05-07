module.exports = (sequelize, DataTypes) => {
    const JobSeekerForm = sequelize.define("JobSeekerForm", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prénom: {
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

    /*const RecruiterForm = sequelize.define("RecruiterForm", {
        nomEntreprise: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City:{
            type: DataTypes.STRING,
            allowNull: false
        },
        poste: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false
        },
        formations: {
            type: DataTypes.STRING,
            allowNull: false
        },
        skills:{
            type: DataTypes.STRING,
            allowNull: false
        },
        keywords: {
            type: DataTypes.STRING,
            allowNull: true
        },
        langues: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    return { JobSeekerForm, RecruiterForm };*/
    return JobSeekerForm;
};

