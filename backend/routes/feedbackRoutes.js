const router = require('express').Router();
const Feedback = require('../models/feedback');
const Activity = require('../models/activity');

// POST: /api/feedback/ SUBMIT FEEDBACK
router.post('/', async (req, res) => {
    try {
        const { activityId, type } = req.body;

        const validTypes = ['smiley', 'frowny', 'surprised', 'confused'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ error: 'Invalid feedback type.' });
        }

        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        if(!activity.is_active) {
            return res.status(400).json({ error: 'This activity is no longer active.' });
        }

        const newFeedback = await Feedback.create({
            activityId,
            type
        });

        const io = req.app.get('io');
        io.to(`activity-${activityId}`).emit('new-feedback', { 
            id: newFeedback.id,
            type: newFeedback.type,
            createdAt: newFeedback.createdAt 
        });

        res.json({ 
            success: true,
            message: 'Feedback submitted successfully.'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;