const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile('public/views/home.html', { root: '.' });
});

router.get('/chats', (req, res) => {
    res.sendFile('public/views/chat_index.html', {root: '.'});
})

module.exports = router;