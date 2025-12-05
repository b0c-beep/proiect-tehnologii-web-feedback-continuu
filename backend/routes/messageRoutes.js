const router = require('express').Router();
const Message = require('../models/message');
const Activity = require('../models/activity');
const authMiddleware = require('../middleware/authMiddleware');

//POST: /api/messages SEND MESSAGE
router.post('/', async (req, res) => {
    try {
        const { activityId, text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Message text cannot be empty.' });
        }

        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        if(!activity.is_active) {
            return res.status(400).json({ error: 'This activity is no longer active.' });
        }

        const newMessage = await Message.create({
            activityId,
            text
        });

        //TODO: Aici vom trimite evenimentul catre frontend in timp real cu Socket.io

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

        const { activityId } = req.params;
        
        const activity = await Activity.findByPk(activityId);

        if(!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        if(activity.userId !== req.user.id) {
            return res.status(403).json({ error: 'You do not have permission to view messages for this activity.' });
        }

        const messages = await Message.findAll({ 
            where: { activityId: activityId },
            order: [['createdAt', 'ASC']] 
        });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;