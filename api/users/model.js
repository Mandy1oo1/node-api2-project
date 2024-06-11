const shortid = require('shortid');

const initializePosts = () => ([
  { id: shortid.generate(), title: 'First Post', contents: 'This is the first post' },
  { id: shortid.generate(), title: 'Second Post', contents: 'This is the second post' },
]);

let posts = initializePosts();

const find = () => {
  return Promise.resolve(posts);
};

const findById = id => {
  const post = posts.find(post => post.id === id);
  return Promise.resolve(post);
};

const insert = ({ title, contents }) => {
  const newPost = { id: shortid.generate(), title, contents };
  posts.push(newPost);
  return Promise.resolve(newPost);
};

const update = (id, changes) => {
  const post = posts.find(post => post.id === id);
  if (!post) return Promise.resolve(null);

  const updatedPost = { ...post, ...changes };
  posts = posts.map(post => (post.id === id ? updatedPost : post));
  return Promise.resolve(updatedPost);
};

const remove = id => {
  const post = posts.find(post => post.id === id);
  if (!post) return Promise.resolve(null);

  posts = posts.filter(post => post.id !== id);
  return Promise.resolve(post);
};

const resetDB = () => {
  posts = initializePosts();
};

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  resetDB,
};
