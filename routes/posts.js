const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).lean();
    res.render('posts/index', { posts });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET all posts
router.get('/', async (req, res) => {
  try {
   const posts = await Post.find().sort({ date: -1 }).lean();
res.render('posts/index', { posts });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET create post form
router.get('/create', (req, res) => {
  res.render('posts/create');
});

// POST create post
router.post('/', async (req, res) => {
  try {
    const { title, body, author } = req.body;
    await Post.create({ title, body, author });
    res.redirect('/posts');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    res.render('posts/show', { post });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET edit post form
router.get('/:id/edit', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    res.render('posts/edit', { post });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const { title, body, author } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, body, author });
    res.redirect('/posts');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;