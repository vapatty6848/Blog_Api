const BADREQUEST = 400;

async function validatedBlogPosts(req, res, next) {
  const { content, title } = req.body;
  if (!title) {
    return res.status(BADREQUEST).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(BADREQUEST).json({ message: '"content" is required' });
  }
  next();
}
module.exports = validatedBlogPosts;
