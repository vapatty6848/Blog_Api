const { Router } = require('express');
const Post = require('../service/Post');
const { TokenValidation } = require('../auth/TokenValidation');

const router = Router();

router.post('/', TokenValidation, async (req, res) => {
  try {
    const { id } = req.tokenUser;
    const { title, content } = req.body;
    const response = await Post.createPost({ title, content, userId: id });
    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(201).json(response);
  } catch (e) {
    console.log(e);
  }
});

router.get('/', TokenValidation, async (req, res) => {
  try {
    const response = await Post.getAll();
    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
  }
});

router.get('/:id', TokenValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Post.getOne({ id });
    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
  }
});

router.put('/:id', TokenValidation, async (req, res) => {
  try {
    const { id: userId } = req.tokenUser;
    const { id } = req.params;
    const { title, content } = req.body;
    const response = await Post.editOne({ id, title, content, userId });
    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
  }
});

router.delete('/:id', TokenValidation, async (req, res) => {
  try {
    const { id: userId } = req.tokenUser;
    const { id } = req.params;
    const response = await Post.deleteOne({ id, userId });

    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(204).send();
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
