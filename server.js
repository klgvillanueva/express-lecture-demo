const express = require('express');
const path = require('path');

const articleRouter = require('./routes/articleRouter');

const app = express();

app.use(express.json());

app.use('/articles', articleRouter);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './views/index.html'))
);

app.use('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.log('ERROR: ', err);
  const errorStatus = err.status || 500;
  return res.status(errorStatus).send(res.locals.message);
});

app.listen(3000, () => console.log(`Listening on port ${PORT}...`));
