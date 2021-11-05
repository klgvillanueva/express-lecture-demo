const articles = require('../model/articleModel');

const baseError = {
  message: 'An error occurred',
  status: 400,
};

const articleController = {};

articleController.getArticles = (req, res, next) => {
  articles.find({}, (err, docs) => {
    if (err) return next({ error: err, ...baseError });
    res.locals.db_articles = docs;
    return next();
  });
};

articleController.createArticle = (req, res, next) => {
  articles.create(
    { name: 'Example Author', title: 'FooBar' },
    (err, newArticle) => {
      if (err) return next({ error: err, ...baseError });
      res.locals.new_db_article = newArticle;
      return next();
    }
  );
};

articleController.getOneArticle = (req, res, next) => {
  articles.find({ id: Number(req.params.articleId) }, (err, doc) => {
    if (err) return next({ error: err, ...baseError });
    res.locals.db_article = doc;
    return next();
  });
};

articleController.updateArticle = (req, res, next) => {
  articles.update(
    res.locals.db_article,
    { title: 'DunDunDun' },
    (err, updatedArticle) => {
      if (err) return next({ error: err, ...baseError });
      res.locals.updated_db_article = updatedArticle;
      return next();
    }
  );
};

articleController.deleteArticle = (req, res, next) => {
  articles.delete(res.locals.db_article.id, (err, success) => {
    if (err) return next({ error: err, ...baseError });
    res.locals.delete_success = true;
    return next();
  });
};

module.exports = articleController;
