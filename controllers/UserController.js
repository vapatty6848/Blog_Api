const { userService } = require('../services');
const { createToken, verifyToken } = require('../middlewares/CheckToken');

const { OK, CREATED, UNAUTHORIZED, NOT_FOUND } = require('../schema/statusSchema');

// *** CREATE NEW USER ***
const create = async (req, res) => {
  const { body } = req;

  const userCreated = await userService.create(body);
  const token = await createToken(userCreated);

  res.status(CREATED).json({ token });
};

// *** GET ALL USERS ***
const getAll = async (req, res) => {
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  const users = await userService.getAll();

  res.status(OK).json(users);
};

// *** GET USER BY ID ***
const getById = async (req, res) => {
  const { id } = req.params;
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  const user = await userService.getById(id);
  if (!user) return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });

  res.status(OK).json(user);
};

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
  getById,
};
