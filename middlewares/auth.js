const jwt = require('jsonwebtoken');

const SECRET = 'SARTOBOLAS';
const config = { algorithm: 'Hs256', expiresIn: '7d' };

const createToken = (payload) => jwt.sign(payload.dataValues, SECRET, config);

const varifyToken = (token) => jwt.verify(token, SECRET);
