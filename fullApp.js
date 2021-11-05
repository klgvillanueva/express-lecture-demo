const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const baseError = {
  message: 'An error occurred',
  status: 400,
};

/**
 * =======================
 * DEFINE NAMED MIDDLEWARE
 * =======================
 */

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

/**
 * ===========================
 * CONFIGURE GLOABL MIDDLEWARE
 * ===========================
 */

app.use((req, res, next) => {
  res.locals.skip = {};
  return next();
});

/**
 * ==================================
 * CONFIGURE ROUTE HANDLER MIDDLEWARE
 * ==================================
 */

app.get('articles/', articleController.getArticles, (req, res) => {
  return res.status(200).json(res.locals.db_articles);
});

app.post('articles/', articleController.createArticle, (req, res) => {
  return res.status(201).json(res.locals.new_db_article);
});

app.put(
  'articles/:articleId',
  articleController.getOneArticle,
  articleController.updateArticle,
  (req, res) => {
    return res.status(200).json(res.locals.updated_db_article);
  }
);

app.delete(
  'articles/:articleId',
  articleController.getOneArticle,
  articleController.deleteArticle,
  (req, res) => {
    return res.status(200).json({ success: true });
  }
);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './views/index.html'))
);

/**
 * =========================
 * CONFIGURE CATCH-ALL ROUTE
 * =========================
 */

app.use((req, res) => res.sendStatus(404));

/**
 * =======================
 * CONFIGURE ERROR HANDLER
 * =======================
 */

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.log('ERROR: ', err);
  const errorStatus = err.status || 500;
  return res.status(errorStatus).send(res.locals.message);
});

/**
 * ============
 * START SERVER
 * ============
 */

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
