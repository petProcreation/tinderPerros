const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authRouter = express.Router();

const secretKey = 'petprocOt2024';

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Contraseña incorrecta');
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

authRouter.post('/register', async (req, res) => {
    const { email, password, confirmPassword, name, age } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name, age });
        await user.save();
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

module.exports = {
    authRouter
};