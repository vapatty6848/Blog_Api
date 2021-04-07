const { userService } = require('../services');

const { OK, CREATED } = require('../schema/statusSchema');

const create = async (req, res) => {
  const { body } = req;
  console.log('Vai iniciar o create');
  const token = await userService.create(body);

  res.status(CREATED).json({ token });
};

const getAll = async (_req, res) => {
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
