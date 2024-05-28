module.exports = (sequelize, DataTypes) => {
    const RecruiterForm = sequelize.define("RecruiterForm", {
        nomEntreprise: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city:{
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

    return RecruiterForm;
};