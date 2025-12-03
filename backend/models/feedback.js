const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedback = sequelize.define('Feedback', {
    type: {
        type: DataTypes.ENUM('smiley', 'frowny', 'surprised', 'confused'),
        allowNull: false
    }
});

module.exports = Feedback;