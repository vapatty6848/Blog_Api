const { Router } = require('express');
const { BlogPost } = require('../models');
const verifyAuth = require('../schemas/verifyAuth');
const { validatePost } = require('../schemas/postsValidation');
const {
  SUCCESS, INTERNAL_SERVER_ERROR,
} = require('../document/HTTPStatus');

const router = new Router();

router.post('/', verifyAuth, validatePost, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const newDate = new Date().toLocaleString();

    await BlogPost.create({
      title, content, userId, published: newDate, updated: newDate,
    });

    return res.status(SUCCESS).json({ title, content, userId });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

// router.get('/', verifyAuth, async (_req, res) => {
//   try {

//     return res.status(OK).json();
//   } catch (err) {
//     return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
//   }
// });

// router.get('/:id', verifyAuth, async (req, res) => {
//   try {

//     return res.status(OK).json();
//   } catch (err) {
//     return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
//   }
// });

// router.delete('/me', verifyAuth, async (req, res) => {
//   try {

//     return res.status(NO_CONTENT).end();
//   } catch (err) {
//     return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
//   }
// });

module.exports = router;
