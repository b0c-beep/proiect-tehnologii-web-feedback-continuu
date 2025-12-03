const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 100]
        }
    },
    access_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: 6
        }
    },
    duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 120
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Activity;