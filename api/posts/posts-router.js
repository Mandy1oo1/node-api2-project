// implement your posts router here
// api/posts/posts-router.js
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "The posts information could not be retrieved" });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "The post information could not be retrieved" });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({ message: "Please provide title and contents for the post" });
  }

  try {
    const newPost = await Posts.insert({ title, contents });
    const post = await Posts.findById(newPost.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "There was an error while saving the post to the database" });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({ message: "Please provide title and contents for the post" });
  }

  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "The post with the specified ID does not exist" });
    }

    await Posts.update(req.params.id, { title, contents });
    const updatedPost = await Posts.findById(req.params.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "The post information could not be modified" });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "The post with the specified ID does not exist" });
    }

    await Posts.remove(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "The post with the specified ID does not exist" });
    }

    const comments = await Posts.findPostComments(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "The comments information could not be retrieved" });
  }
});

module.exports = router;
