const router = require('express').Router();
const Feedback = require('../models/feedback');
const Activity = require('../models/activity');
const authMiddleware = require('../middleware/authMiddleware');

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

        if (!activity.is_active) {
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

// GET: /api/feedback/:activityId/stats GET FEEDBACK STATS
router.get('/:activityId/stats', authMiddleware, async (req, res) => {
    try {
        const { activityId } = req.params;

        const activity = await Activity.findByPk(activityId);
        if (!activity) return res.status(404).json({ error: 'Activity not found.' });
        if (activity.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized.' });

        const counts = {
            smiley: await Feedback.count({ where: { activityId, type: 'smiley' } }),
            frowny: await Feedback.count({ where: { activityId, type: 'frowny' } }),
            surprised: await Feedback.count({ where: { activityId, type: 'surprised' } }),
            confused: await Feedback.count({ where: { activityId, type: 'confused' } })
        };
        counts.total = counts.smiley + counts.frowny + counts.surprised + counts.confused;

        res.status(200).json(counts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: /api/feedback/:activityId/timeline GET FEEDBACK TIMELINE
router.get('/:activityId/timeline', authMiddleware, async (req, res) => {
    try {
        const { activityId } = req.params;

        const activity = await Activity.findByPk(activityId);
        if (!activity) return res.status(404).json({ error: 'Activity not found.' });
        if (activity.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized.' });

        const feedbacks = await Feedback.findAll({
            where: { activityId },
            attributes: ['id', 'type', 'createdAt'],
            order: [['createdAt', 'ASC']]
        });

        res.status(200).json({
            startedAt: activity.started_at || activity.createdAt,
            feedbacks: feedbacks.map(f => ({
                id: f.id,
                type: f.type,
                createdAt: f.createdAt
            }))
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;