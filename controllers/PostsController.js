const { Router } = require('express');
const PostServices = require('../services/PostServices');
const SearchService = require('../services/SearchService');
const Utils = require('../utils');

const router = Router();

router.get('/search', Utils.verifyToken, SearchService.searchBlog);
router.get('/:id', Utils.verifyToken, PostServices.getPostById);
router.put('/:id', Utils.verifyToken, PostServices.updatePostById, PostServices.getPostById);
router.delete('/:id', Utils.verifyToken, PostServices.deletePost);
router.get('/', Utils.verifyToken, PostServices.getPosts);
router.post('/', Utils.verifyToken, PostServices.createPost);

module.exports = router;
