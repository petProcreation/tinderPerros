const Pet = require('../models/pets');


// Create a new pet
async function createPet(req, res) {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json(pet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all pets
async function getAllPets(req, res) {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single pet by ID
async function getPetById(req, res) {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a pet by ID
async function updatePet(req, res) {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a pet by ID
async function deletePet(req, res) {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPet, getAllPets, getPetById, updatePet, deletePet };