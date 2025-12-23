const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// POST /api/auth/register REGISTER NEW USER
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body; //user data from request body

        const existinUser = await User.findOne({ where: { email } }); //check if user exists
        if (existinUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10); //generate salt for creating hash
        const hashedPassword = await bcrypt.hash(password, salt); //create hash

        // create new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/login LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; //user data from request body

        const user = await User.findOne({ where: { email } }); //get user from database
        if (!user) {
            return res.status(400).json({ error: 'Invalid email.' });
        }

        const validPassword = await bcrypt.compare(password, user.password); //compare password
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password.' });
        }

        // create token
        const token = jwt.sign(
            { id: user.id, email: user.email }, //payload
            process.env.JWT_SECRET, //secret
            { expiresIn: '24h' } //options
        );

        // return token and user data
        res.json({
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
