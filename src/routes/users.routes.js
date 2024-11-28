const express = require('express');
const { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/users.controllers');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', auth, getUsers);
userRouter.get('/:id', auth, getUserById);
userRouter.put('/:id', auth, updateUser);
userRouter.delete('/:id', auth, deleteUser);

module.exports = {
    userRouter
};