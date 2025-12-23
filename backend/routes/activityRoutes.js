const router = require('express').Router();
const Activity = require('../models/activity');
const User = require('../models/user');
const Message = require('../models/message');
const Feedback = require('../models/feedback');
const { sendActivityReport } = require('../utils/email_api');
const authMiddleware = require('../middleware/authMiddleware');

// POST: /api/activities CREATE ACTIVITY
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, duration_minutes } = req.body; //get title and duration from request body

        const access_code = Math.random().toString(36).substring(2, 8).toUpperCase(); //get random access code

        //create activity
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

// PATCH: /api/activities/:id MODIFY ACTIVITY STATUS
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params; //get activity id from request params
        const { is_active } = req.body; //get new activity status from request body
        const activity = await Activity.findOne({ where: { id: id, userId: req.user.id } }); //get activity from database

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        // set started_at when activity becomes active
        if (is_active === true && !activity.is_active) {
            activity.started_at = new Date();
        }

        // reset started_at when activity is deactivated
        if (is_active === false) {
            activity.started_at = null;

            //send email report
            try {
                const [user, smiley, frowny, surprised, confused, messages] = await Promise.all([
                    User.findByPk(req.user.id),
                    Feedback.count({ where: { activityId: activity.id, type: 'smiley' } }),
                    Feedback.count({ where: { activityId: activity.id, type: 'frowny' } }),
                    Feedback.count({ where: { activityId: activity.id, type: 'surprised' } }),
                    Feedback.count({ where: { activityId: activity.id, type: 'confused' } }),
                    Message.findAll({ where: { activityId: activity.id }, order: [['createdAt', 'ASC']] })
                ]);

                const stats = { smiley, frowny, surprised, confused };

                await sendActivityReport(user.email, `${user.firstName} ${user.lastName}`, activity, stats, messages);
            } catch (err) {
                console.error('Error sending email report:', err);
            }
        }

        activity.is_active = is_active;
        await activity.save();


        res.status(200).json({ message: 'Activity status updated successfully.', activity });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: /api/activities/:id GET ACTIVITY DETAILS
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findOne({ //get activity from database by id
            where: { id: id, userId: req.user.id }
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: /api/activities GET ALL ACTIVITIES
router.get('/', authMiddleware, async (req, res) => {
    try {
        const activities = await Activity.findAll({ //get all activities from database
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: /api/activities/join JOIN ACTIVITY
router.post('/join', async (req, res) => {
    try {
        const { access_code } = req.body; //get access code from request body

        const activity = await Activity.findOne({ where: { access_code } }); //get activity from database by access code

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found with the provided access code.' });
        }

        if (!activity.is_active) {
            return res.status(400).json({ error: 'This activity is no longer active.' });
        }

        //return activity details
        res.json({
            success: true,
            activityId: activity.id,
            title: activity.title,
            duration_minutes: activity.duration_minutes
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//DELETE: api/activities/:id DELETE ACTIVITY
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params; //get activity id from request params
        const activity = await Activity.findOne({ where: { id: id, userId: req.user.id } }); //get activity from database by id

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        await activity.destroy(); //delete activity from database

        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//GET: /api/activities/:id/status GET ACTIVITY STATUS
router.get('/:id/status', async (req, res) => {
    try {
        const { id } = req.params; //get activity id from request params
        const activity = await Activity.findByPk(id); //get activity from database by id

        if (!activity) {
            return res.status(404).json({ error: "Activity not found", is_active: false });
        }

        res.status(200).json({ is_active: activity.is_active });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;