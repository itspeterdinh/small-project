const express = require("express");
const cors = require("cors");
const app = express();

// cors
app.use(cors());
require("./startup/cors")(app);
// routes
require("./startup/routes")(app);
// production
require("./startup/production")(app);

module.exports = app;
