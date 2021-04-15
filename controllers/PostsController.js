const { Router } = require('express');
const PostServices = require('../services/PostServices');
const Utils = require('../utils');

const router = Router();

router.post('/', Utils.verifyToken, PostServices.createPost);

// router.get('/', Utils.verifyToken, PostServices.getPosts);

// router.get('/:id', Utils.verifyToken, PostServices.getPostById);

// router.put('/:id', Utils.verifyToken, PostServices.updatePostById);

// router.delete('/:id', Utils.verifyToken, PostServices.deletePost);

module.exports = router;
