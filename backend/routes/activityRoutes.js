const router = require('express').Router();
const Activity = require('../models/activity');
const authMiddleware = require('../middleware/authMiddleware');

// POST: /api/activities CREARE ACTIVITATE
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, duration_minutes } = req.body;
        
        const access_code = Math.random().toString(36).substring(2, 8).toUpperCase();

        const newActivity = await Activity.create({
            title,
            duration_minutes,
            access_code,
            userId: req.user.id
        });

        res.json({ message: 'Activity created successfully.', activity: newActivity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH: /api/activities/:id MODIFICARE STATUS ACTIVITATE
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;
        const activity = await Activity.findOne({ where: { id: id, userId: req.user.id } });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        activity.is_active = is_active;;
        await activity.save();

        res.status(200).json({ message: 'Activity status updated successfully.', activity });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: /api/activities LISTA ACTIVITATILOR UNUI ANUMIT PROFESOR
router.get('/', authMiddleware, async (req, res) => {
    try {
        const activities = await Activity.findAll({ 
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']] 
        });

        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: /api/activities/join JOIN STUDENT LA ACTIVITATE
router.post('/join', async (req, res) => {
    try {
        const { access_code } = req.body;

        const activity = await Activity.findOne({ where: { access_code } });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found with the provided access code.' });
        }

        if(!activity.is_active) {
            return res.status(400).json({ error: 'This activity is no longer active.' });
        }

        res.json({
            success: true,
            activityId: activity.id,
            title:  activity.title,
            duration_minutes: activity.duration_minutes
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//DELETE: api/activities/:id STERGERE ACTIVITATE
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findOne({where: {id: id, userId: req.user.id}});

        if(!activity) {
            return res.status(404).json({error: "Activity not found"});
        }

        await activity.destroy();

        res.status(200).json({message: 'Activity deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    } 
});

//GET: /api/activities/:id/status STATUS ACTIVITATE
router.get('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);

        if(!activity) {
            return res.status(404).json({error: "Activity not found", is_active: false});
        }

        res.status(200).json({is_active: activity.is_active});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;