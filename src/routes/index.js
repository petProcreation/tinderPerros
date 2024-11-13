const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile('public/views/home.html', { root: '.' });
});

module.exports = router;