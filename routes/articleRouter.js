const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getArticles, (req, res) => {
  return res.status(200).json(res.locals.db_articles);
});

router.post('/', articleController.createArticle, (req, res) => {
  return res.status(201).json(res.locals.new_db_article);
});

router.put(
  '/:articleId',
  articleController.getOneArticle,
  articleController.updateArticle,
  (req, res) => {
    return res.status(200).json(res.locals.updated_db_article);
  }
);

router.delete(
  '/:articleId',
  articleController.getOneArticle,
  articleController.deleteArticle,
  (req, res) => {
    return res.status(200).json({ success: true });
  }
);

module.exports = router;
