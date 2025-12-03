const sequelize = require('../config/db');

const User = require('../models/user');
const Message = require('../models/message');
const Feedback = require('../models/feedback');
const Activity = require('../models/activity');

User.hasMany(Activity, { foreignKey: 'userId', onDelete: 'CASCADE' });
Activity.belongsTo(User, { foreignKey: 'userId' });

Activity.hasMany(Feedback, { foreignKey: 'activityId', onDelete: 'CASCADE' });
Feedback.belongsTo(Activity, { foreignKey: 'activityId' });

Activity.hasMany(Message, { foreignKey: 'activityId', onDelete: 'CASCADE' });
Message.belongsTo(Activity, { foreignKey: 'activityId' });

const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

module.exports = {
    sequelize,
    User,   
    Message,
    Feedback,
    Activity,
    syncDB
};