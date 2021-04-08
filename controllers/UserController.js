const { Router } = require('express');
const UserService = require('../services/UserService');
const {
  validateDisplayName,
  emailValidation,
  validateUniqueEmail,
  passwordValidation,
  tokenValidation,
} = require('../middlewares');
const statusCode = require('../dicts/statusCodesHTTP');

const router = Router();

router.post('/',
  validateDisplayName,
  emailValidation,
  validateUniqueEmail,
  passwordValidation,
  async (request, response) => {
    const { displayName, email, password, image } = request.body;
    const newUser = { displayName, email, password, image };

    const token = await UserService.create(newUser);
    return response.status(statusCode.CREATED).json({ token });
  });

router.get(
  '/',
  tokenValidation,
  async (request, response) => {
    const users = await UserService.getAll();
    return response.status(statusCode.OK).json(users);
  },
);

router.get(
  '/:id',
  tokenValidation,
  async (request, response) => {
    const { id } = request.params;
    const retrievedUser = await UserService.getById(id);
    if (!retrievedUser) {
      return response
        .status(statusCode.NOT_FOUND)
        .json({ message: 'Usuário não existe' });
    }
    return response.status(statusCode.OK).json(retrievedUser);
  },
);

router.delete(
  '/me',
  tokenValidation,
  async (request, response) => {
    const { id } = response.locals.authenticatedUser;
    await UserService.remove(id);
    return response.status(statusCode.NO_CONTENT).end();
  },
);

module.exports = router;
