const { userService } = require('../services');
const { createToken, verifyToken } = require('../middlewares/CheckToken');

const { OK, CREATED, UNAUTHORIZED } = require('../schema/statusSchema');

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
  if (validation.message) {
    return res.status(UNAUTHORIZED).json({ message: validation.message });
  }

  const users = await userService.getAll();
  console.log('USERS', users);

  res.status(OK).json(users);
};

// const getOne = async (req, res, next) => {
//   try {
//     const { id } = req.params
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
