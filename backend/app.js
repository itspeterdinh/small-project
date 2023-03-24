const express = require('express');
const cors = require('cors');
const app = express();

const globalErrorHandler = require('./controllers/errorController');

// cors
app.use(cors());
require('./startup/cors')(app);
// routes
require('./startup/routes')(app);
// production
require('./startup/production')(app);

app.use(globalErrorHandler);

module.exports = app;
