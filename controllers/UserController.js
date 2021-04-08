const { userService } = require('../services');
const { verifyToken } = require('../middlewares/CheckToken');

const { OK, CREATED, UNAUTHORIZED } = require('../schema/statusSchema');

const create = async (req, res) => {
  const { body } = req;

  const token = await userService.create(body);

  res.status(CREATED).json({ token });
};

const getAll = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  try {
    const decodedToken = verifyToken(token);
    const { email } = decodedToken;
    const user = await userService.getByEmail(email);
    if (user === null) {
      return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
    }
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
  const users = await userService.getAll();

  res.status(OK).json(users);
};

// const getOne = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const getUser = await users.getOne(id);
//     res.status(StatusCodes.OK).json(getUser);
//   } catch (err) {
//     return next({ err });
//   }
// };

// const removeOne = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     await users.removeOne(userId);
//     res.status(StatusCodes.NO_CONTENT).json();
//   } catch (err) {
//     return next({ err });
//   }
// };

module.exports = {
  create,
  getAll,
};
