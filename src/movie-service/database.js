const sqlite3 = require('sqlite3').verbose();

const appDatabase = new sqlite3.Database(':memory:')

// Export router
module.exports = appDatabase;
