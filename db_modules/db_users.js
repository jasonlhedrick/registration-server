const db = require('./db_config');
const token = require('../jwt/tokens');

function createUserTable() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            hash TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL)`
        )
}

function insertUser(res, user) {
    db.run(`INSERT INTO users(username, hash, email) 
        VALUES (?, ?, ?)`, [user.username, user.password, user.email], function (error, result) {
            if(error) {
                res.status(400).json({'error': error.message});
            }
            else {
                res.status(200).json({token: token.signToken(this.changes.lastID), 'msg': 'User successfully registered.'});
            }
        });
}

function getUsers() {
        db.all(`SELECT * FROM users`, (err, rows) => {
            if (err) {
                console.log(err.message);
                throw err;
            }
            console.log(rows);
        });
}

function dropUsersTable() {
        db.all('DROP TABLE users', (err, res) => {
            if(err) {
                console.log(err.message);
                throw err;
            }
        })
}

module.exports = {
    createUserTable,
    insertUser,
    getUsers,
    dropUsersTable
}