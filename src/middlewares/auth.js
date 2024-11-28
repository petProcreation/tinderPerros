const jwt = require('jsonwebtoken');
const secretKey = 'petprocOt2024'; 

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Token inválido');
    }
};

module.exports = auth;