const mongoose = require('mongoose');

const { app, port } = require('./src/server');
const dbConfig = require('./config/config');

// Start servern
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(dbConfig.databaseURL, dbOptions).then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}! http://localhost:4000`))
});

module.exports = { app, port };