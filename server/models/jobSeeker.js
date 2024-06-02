module.exports = (sequelize, DataTypes) => {
    const JobSeekerForm = sequelize.define("JobSeekerForm", {
      // Define the model attributes
      nom: { type: DataTypes.STRING, allowNull: false },
      prenom: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      formations: { type: DataTypes.STRING, allowNull: false },
      experiences: { type: DataTypes.STRING },
      projetsAcademiques: { type: DataTypes.STRING },
      langues: { type: DataTypes.STRING, allowNull: false },
      langages: { type: DataTypes.STRING },
      logiciels: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING, allowNull: false },
      UserJobSeekerId: { type: DataTypes.INTEGER, allowNull: false }
    });
  
    JobSeekerForm.associate = (models) => {
      JobSeekerForm.belongsTo(models.UserJobSeeker, {
        foreignKey: 'UserJobSeekerId',
        onDelete: 'CASCADE'
      });
      JobSeekerForm.hasMany(models.Interest, {
        foreignKey: 'UserJobSeekerId',
        sourceKey: 'UserJobSeekerId',
        onDelete: 'CASCADE'
      });
    };
  
    // Add the hook to delete interests before destroying a JobSeekerForm
    JobSeekerForm.addHook('beforeDestroy', async (jobSeekerForm, options) => {
      const { Interest } = sequelize.models;
      await Interest.destroy({
        where: { UserJobSeekerId: jobSeekerForm.UserJobSeekerId },
        transaction: options.transaction
      });
    });
  
    return JobSeekerForm;
  };
  