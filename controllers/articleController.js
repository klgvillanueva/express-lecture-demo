/* ==========================================================================
* SETTING UP THE ENVIRONMENT (require modules, invoke Router) *
============================================================================= */

const articles = require('../model/articleModel');

/* ===============================================================================================================
* INITIALIZE CONTROLLER OBJECT (invoke next middleware if necessary, save persistent data, customizer error obj) *
================================================================================================================== */

const articleController = {};

articleController.getArticles = (req, res, next) => {
  articles.find({}, (err, docs) => {
    if (err)
      return next({
        log: 'Error in articleController.getArticles',
        message: { err: 'We cannot access the articles' },
      });
    res.locals.db_articles = docs;
    return next();
  });
};

articleController.createArticle = (req, res, next) => {
  articles.create(
    { name: 'Example Author', title: 'FooBar' },
    (err, newArticle) => {
      if (err)
        return next({
          log: 'Error in createController.getArticles',
          message: { err: 'We cannot add an article to the database' },
        });
      res.locals.new_db_article = newArticle;
      return next();
    }
  );
};

articleController.getOneArticle = (req, res, next) => {
  articles.find({ id: Number(req.params.articleId) }, (err, doc) => {
    if (err)
      return next({
        log: 'Error in articleController.getOneArticle',
        message: { err: 'We cannot find the article you are looking for' },
      });
    res.locals.db_article = doc;
    return next();
  });
};

articleController.updateArticle = (req, res, next) => {
  articles.update(
    res.locals.db_article,
    { title: 'DunDunDun' },
    (err, updatedArticle) => {
      if (err)
        return next({
          log: 'Error in articleController.updateArticle',
          message: { err: 'We cannot update the article' },
        });
      res.locals.updated_db_article = updatedArticle;
      return next();
    }
  );
};

articleController.deleteArticles = (req, res, next) => {
  articles.delete(res.locals.db_article.id, (err, success) => {
    if (err)
      return next({
        log: 'Error in articleController.deleteArticle',
        message: { err: 'We cannot delete the article' },
      });
    res.locals.delete_success = true;
    return next();
  });
};

/* ==========================================================================
* EXPORT CONTROLLER *
============================================================================= */
module.exports = articleController;
