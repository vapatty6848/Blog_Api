// const { BlogPost, User } = require('../../models');

// const NOT_FOUND = 404;

// const postDoesNotExists = {
//   payload: { message: 'Post não existe' },
//   status: NOT_FOUND,
// };

// const validatePost = async ({ postId, action, title = null, content = null }) => {
//   if (action === 'FIND') {
//     const result = await BlogPost.findAll({
//       where: { id: postId },
//       include: [{ model: User, as: 'user' }],
//     });

//     if (!result.length) return postDoesNotExists;
//     return result;
//   }

//   if (action === 'DELETE') {
//     const result = await BlogPost.destroy({ where: { id: postId } });

//     return result;
//   }

//   if (action === 'UPDATE') {
//     const result = await BlogPost.update({ title, content }, { where: { id: postId } });

//     return result;
//   }
// };

// module.exports = validatePost;
