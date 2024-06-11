const express = require('express');
const Post = require('./model'); // You also need to implement this model similar to the users model
const router = express.Router();

// GET ALL POSTS
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// GET POST BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist' });
    }
  } catch (err) {
    next(err);
  }
});

// CREATE NEW POST
router.post('/', async (req, res, next) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post' });
    } else {
      const newPost = await Post.insert(req.body);
      res.status(201).json(newPost);
    }
  } catch (err) {
    next(err);
  }
});

// UPDATE POST
router.put('/:id', async (req, res, next) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post' });
    } else {
      const updatedPost = await Post.update(req.params.id, req.body);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      }
    }
  } catch (err) {
    next(err);
  }
});

// DELETE POST
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPost = await Post.remove(req.params.id);
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist' });
    }
  } catch (err) {
    next(err);
  }
});

// Handle errors
router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

module.exports = router;
