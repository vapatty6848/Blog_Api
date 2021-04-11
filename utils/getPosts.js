function getPosts(postsList) {
  return postsList.map((element) => element.dataValues);
}

module.exports = getPosts;
