const { Router } = require('express');
const statusCode = require('../dicts/statusCodesHTTP');

const router = Router();

router.post(
  '/',
  async (request, response) => {
    console.log('Rota post');
    return response.status(statusCode.OK).send('POST route');
  },
);

module.exports = router;
