const router = require('express').Router();
const { BlogPost, User } = require('../models');

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
        blogPosts
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/blogpost/:id', async (req, res) => {
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
        ...blogPost
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;