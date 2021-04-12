const statusCode = require('../dicts/statusCodesHTTP');
const BlogPostService = require('../services/BlogPostService');

async function userAuthorization(request, response, next) {
  const { id: requestPostId } = request.params;
  const { id: requestUserId } = response.locals.authenticatedUser;
  const retrievedPost = await BlogPostService.getById(requestPostId);
  const { id: postUserId } = retrievedPost.user.dataValues;
  if (requestUserId === postUserId) {
    return next();
  }
  return next({
    code: statusCode.UNAUTHORIZED,
    message: 'Usuário não autorizado',
  });
}
module.exports = userAuthorization;
