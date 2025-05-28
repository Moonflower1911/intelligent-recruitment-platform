module.exports = (sequelize, DataTypes) => {
    const Interview = sequelize.define("Interview", {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        communication_score: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 5 }
        },
        technical_score: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 5 }
        },
        motivation_score: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 5 }
        },
        notes: {
            type: DataTypes.TEXT
        },
        video_path: {
            type: DataTypes.STRING
        },
        notes_score: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        video_score: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        overall_score: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        tableName: 'Interviews'
    });


    Interview.associate = (models) => {
        Interview.belongsTo(models.UserRecruiter, {
            foreignKey: 'recruiterId',
            onDelete: 'CASCADE'
        });

        Interview.belongsTo(models.Interest, {
            foreignKey: 'interestId',
            onDelete: 'CASCADE'
        });
    };

    return Interview;
};
