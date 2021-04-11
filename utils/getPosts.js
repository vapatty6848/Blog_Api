function getPosts(postsList) {
  return postsList.map((element, index) => element.dataValues);
}

module.exports = getPosts;
