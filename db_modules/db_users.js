const db = require('./db_config');

function createUserTable() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                hash TEXT NOT NULL,
                email TEXT NOT NULL)`
            )
    });
}

function insertUser(username, hash, email) {
    db.serialize(() => {
        db.run(`INSERT INTO users(username, hash, email) 
        VALUES (?, ?, ?)`, [username, hash, email], (err) => {
            if (err) {
                console.log(err.message);
                throw err;
            }
        });
    });
}

function getUsers() {
    db.serialize(() => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
            if (err) {
                console.log(err.message);
                throw err;
            }
            console.log(rows);
        });
    })
}

function dropUsersTable() {
    db.serialize(() => {
        db.all('DROP TABLE users', (err, res) => {
            if(err) {
                console.log(err.message);
                throw err;
            }
        })
    })
}

module.exports = {
    createUserTable,
    insertUser,
    getUsers,
    dropUsersTable
}