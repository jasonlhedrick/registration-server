const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/users.db', (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    }
    console.log('Connected to the users database.');
});

module.exports = db;