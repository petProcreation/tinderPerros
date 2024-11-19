const { Router } = require('express');

const router = Router();

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