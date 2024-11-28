const { createPet, getPetById, getAllPets, updatePet, deletePet } = require('../controllers/pets.controllers');
const express = require('express');
const authMiddleware = require('../middlewares/auth');


const petRouter = express.Router();


petRouter.post('/', authMiddleware ,createPet);
petRouter.get('/', getAllPets);
petRouter.get('/:id', getPetById);
petRouter.put('/:id', updatePet);
petRouter.delete('/:id', deletePet);

module.exports = {
    petRouter
};

