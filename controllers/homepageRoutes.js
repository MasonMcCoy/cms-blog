const router = require('express').Router();
const { BlogPost, User } = require('../models');
const auth = require('../utils/auth');

// Renders homepage with all existing blog posts
router.get('/', async (req, res) => {
    try {
     
      const blogPostData = await BlogPost.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
  
      res.render('homepage', { 
        blogPosts,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Select and view individual blog posts
router.get('/blogpost/:id', auth, async (req, res) => {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const blogPost = blogPostData.get({ plain: true });
  
      res.render('blogpost', {
        ...blogPost,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// View dashboard of logged in user
router.get('/dashboard', auth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: BlogPost }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Render login screen
router.get('/login', (req, res) => {
    // Redirect if already logged in
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

module.exports = router;