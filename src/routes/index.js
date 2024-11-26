const express = require('express');
const { userRouter } = require('./users.routes');
const { petRouter } = require('./pets.routes');
const { matchRouter } = require('./match.routes');

const router = express.Router();


router.use('/api/v0/users', userRouter);
router.use('/api/v0/pets', petRouter);
router.use('/api/v0/matches', matchRouter);


router.get('/', (req, res) => {
    res.sendFile('public/views/home.html', { root: '.' });
});

router.get('/home', (req, res) => {
    res.sendFile('public/views/home.html', { root: '.' });
});

router.get('/contact', (req, res) => {
    res.sendFile('public/views/contact.html', { root: '.' });
});

router.get('/chats', (req, res) => {
    res.sendFile('public/views/chat_index.html', {root: '.'});
})

router.get('/chat/Firulais', (req, res) => {
    res.sendFile('public/views/chat.html', {root: '.'});
});


module.exports = router;