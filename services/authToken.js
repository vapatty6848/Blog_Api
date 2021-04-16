// const jwt = require('jsonwebtoken');

// const secret = 'secret';

// const tokenValid = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).json({ message: 'missing auth token' });
//   }

//   jwt.verify(authorization, secret, async (err, decoded) => {
//     if (err) return res.status(401).json({ message: msg });
//     const { email } = decoded;
//     next();
//   });
// };

// module.exports = { tokenValid };
