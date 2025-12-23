const router = require('express').Router();
const Message = require('../models/message');
const Activity = require('../models/activity');
const authMiddleware = require('../middleware/authMiddleware');

//POST: /api/messages SEND MESSAGE
router.post('/', async (req, res) => {
    try {
        const { activityId, text } = req.body; //message data from request body

        if (!text || text.trim() === '') { //check if text is empty
            return res.status(400).json({ error: 'Message text cannot be empty.' });
        }

        const activity = await Activity.findByPk(activityId); //get activity from database
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        if (!activity.is_active) { //check if activity is active
            return res.status(400).json({ error: 'This activity is no longer active.' });
        }

        const newMessage = await Message.create({ //create new message
            activityId,
            text
        });

        // emit new message to all users in the activity
        const io = req.app.get('io');
        io.to(`activity-${activityId}`).emit('new-message', {
            id: newMessage.id,
            text: newMessage.text,
            createdAt: newMessage.createdAt
        });

        // return success message
        res.json({
            success: true,
            message: 'Message sent successfully.',
            data: newMessage
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GET: /api/messages/:activityId GET MESSAGES FOR ACTIVITY
router.get('/:activityId', authMiddleware, async (req, res) => {
    try {

        const { activityId } = req.params; //activity id from request params

        const activity = await Activity.findByPk(activityId); //get activity from database

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        if (activity.userId !== req.user.id) { //check if user is the owner of the activity
            return res.status(403).json({ error: 'You do not have permission to view messages for this activity.' });
        }

        // get messages for activity
        const messages = await Message.findAll({
            where: { activityId: activityId },
            order: [['createdAt', 'ASC']] //order by createdAt ASC
        });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;