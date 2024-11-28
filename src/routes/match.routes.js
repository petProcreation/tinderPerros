const { createMatch, deleteMatchById, getAllMatches, getMatchById, updateMatchById } = require('../controllers/match.controllers');
const express = require('express');

const matchRouter = express.Router();

matchRouter.post('/', createMatch);
matchRouter.get('/', getAllMatches);
matchRouter.get('/:id', getMatchById);
matchRouter.put('/:id', updateMatchById);
matchRouter.delete('/:id', deleteMatchById);

module.exports = {
    matchRouter
};
