module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define("Interest", {
        UserJobSeekerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        OfferId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Interest.associate = (models) => {
        Interest.belongsTo(models.UserJobSeeker, {
            foreignKey: 'UserJobSeekerId',
            onDelete: 'CASCADE'
        });
        Interest.belongsTo(models.RecruiterForm, {
            foreignKey: 'OfferId',
            onDelete: 'CASCADE'
        });
        Interest.belongsTo(models.JobSeekerForm, {
            foreignKey: 'OfferId',
            onDelete: 'CASCADE'
        });
    };

        return Interest;
};