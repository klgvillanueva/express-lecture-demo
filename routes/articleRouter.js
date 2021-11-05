/* ==========================================================================
* SETTING UP THE ENVIRONMENT (require modules, invoke Router) *
============================================================================= */

const express = require('express');
// invoking express.Router
const router = express.Router();
// require in controller
const articleController = require('../controllers/articleController');

/* ==========================================================================
* HANDLE ROUTES (with middleware chain) *
============================================================================= */

// get requests to /articles
router.get('/', articleController.getArticles, (req, res) => {
  return res.status(200).json(res.locals.db_articles);
});

// post requests to /articles
router.post('/', articleController.createArticle, (req, res) => {
  return res.status(201).json(res.locals.new_db_article);
});

// put requests to a specific article
router.put(
  '/:articleId',
  articleController.getOneArticle,
  articleController.updateArticle,
  (req, res) => {
    return res.status(200).json(res.locals.updated_db_article);
  }
);

// delete requests to a specific article
router.delete(
  '/:articleId',
  articleController.getOneArticle,
  articleController.deleteArticle,
  (req, res) => {
    return res.status(200).json({ success: true });
  }
);

/* ==========================================================================
* EXPORT ROUTER *
============================================================================= */

module.exports = router;
