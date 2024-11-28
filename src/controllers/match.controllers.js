const { Match } = require('../models/matches');


// Create a new match
async function createMatch(req, res) {
    try {
        const match = new Match(req.body);
        await match.save();
        res.status(201).send(match);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read all matches
async function getAllMatches(req, res) {
    try {
        const matches = await Match.find({});
        res.status(200).send(matches);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read a single match by ID
async function getMatchById(req, res) {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(404).send();
        }
        res.status(200).send(match);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a match by ID
async function updateMatchById(req, res) {
    try {
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!match) {
            return res.status(404).send();
        }
        res.status(200).send(match);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a match by ID
async function deleteMatchById(req, res) {
    try {
        const match = await Match.findByIdAndDelete(req.params.id);
        if (!match) {
            return res.status(404).send();
        }
        res.status(200).send(match);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createMatch,
    getAllMatches,
    getMatchById,
    updateMatchById,
    deleteMatchById
};




