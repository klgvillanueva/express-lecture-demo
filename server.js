/* ==========================================================================
* SETTING UP THE ENVIRONMENT (require modules, invoke express, body-parsing)*
============================================================================= */
const express = require('express');
const path = require('path');
//require in our router
const articleRouter = require('./routes/articleRouter');
//invoke express
const app = express();
// parses through JSON data
app.use(express.json());
// parses through urlencoded data
app.use(express.urlencoded());

/* ==========================================================================
* HANDLE ROUTES (with specific methods and endpoints)*
============================================================================= */

// any request to the articles endpoint
app.use('/articles', articleRouter);

// get request to the root endpoint
app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, './views/index.html'))
);

// catch-all for any unhandled endpoints
app.use('*', (req, res) => res.sendStatus(404));

/* ==========================================================================
* HANDLE ERRORS (with Global Error Handler)*
============================================================================= */

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/* ==========================================================================
* ESTABLISH NETWORK CONNECTION *
============================================================================= */

// listen to the port
app.listen(3000, () => console.log(`Listening on port ${PORT}...`));
