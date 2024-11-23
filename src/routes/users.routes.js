const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/users.controllers');



const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);




module.exports = {
    userRouter
};