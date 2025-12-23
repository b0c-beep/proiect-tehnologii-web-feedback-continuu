const sequelize = require('../config/db');

//models
const User = require('../models/user');
const Message = require('../models/message');
const Feedback = require('../models/feedback');
const Activity = require('../models/activity');

//relations
User.hasMany(Activity, { foreignKey: 'userId', onDelete: 'CASCADE' });
Activity.belongsTo(User, { foreignKey: 'userId' });

Activity.hasMany(Feedback, { foreignKey: 'activityId', onDelete: 'CASCADE' });
Feedback.belongsTo(Activity, { foreignKey: 'activityId' });

Activity.hasMany(Message, { foreignKey: 'activityId', onDelete: 'CASCADE' });
Message.belongsTo(Activity, { foreignKey: 'activityId' });


//database sync function
const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

//exports
module.exports = {
    sequelize,
    User,
    Message,
    Feedback,
    Activity,
    syncDB
};