const BlogsRepository = require('../database/repositories/BlogsRepository');

const createBlog = async (blogData) => {
  const BlogPostData = await BlogsRepository.create(blogData);
  console.log(BlogPostData);
  return BlogPostData.dataValues;
};
// [
//   {
//     "id": "7706273476706534553",
//     "published": "2011-08-01T19:58:00.000Z",
//     "updated": "2011-08-01T19:58:51.947Z",
//     "title": "Latest updates, August 1st",
//     "content": "The whole text for the blog post goes here in this key",
//     "user": { // esse usuário é o autor do post
//       "id": "401465483996",
//       "displayName": "Brett Wiltshire",
//       "email": "brett@email.com",
//       "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
//     }
//   }
// ]

const getAllPostsByUser = async (userId) => {
  const [...blogPosts] = await BlogsRepository.getAllById(userId);
  console.log(blogPosts);
  return blogPosts;
};

module.exports = {
  createBlog, getAllPostsByUser,
};
