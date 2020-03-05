const mongoose = require('mongoose');

const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();

const dbConfig = require('./config/config');
const port = process.env.PORT || 4000;

// middlewares
app.use(sassMiddleware({ // tell sassMiddleware where src file and dest directory is
    src: 'sass',
    dest: 'public',
    // debug: true, // för att skriva ut data till konsollen
    outputStyle: 'compressed'
}));
// define a static folder, 'public'
app.use(express.static('public'));
// express body-parser
app.use(express.urlencoded({ extended: true }));
// view engine to use, ejs in this case
app.set('view engine', 'ejs');

// routes variables
const mainRoute = require("./src/routes/mainRoute");

// routes use
app.use(mainRoute);

// Start servern
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(dbConfig.databaseURL, dbOptions).then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}! http://localhost:4000`))
});

// module.exports = { app, port };