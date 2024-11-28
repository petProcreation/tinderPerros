const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'petprocOt2024';

// Create a new user
async function createUser(req, res) {
    const { email, password, confirmPassword, name, age } = req.body;
    console.log('Datos recibidos:', { email, password, confirmPassword, name, age });
    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name, age });
        await user.save();
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        console.log('Usuario creado:', user);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send('Error en el servidor');
    }
}

// Login user
async function loginUser(req, res) {
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
}

// Get all users
async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a user by ID
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a user by ID
async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete a user by ID
async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};