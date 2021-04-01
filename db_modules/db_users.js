const db = require('./db_config');

function createUserTable() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                hash TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL)`
            )
    });
}

function insertUser(req, res, user) {
    db.run(`INSERT INTO users(username, hash, email) 
        VALUES (?, ?, ?)`, [user.username, user.password, user.email], async(error, result) => {
            if(error) {
                res.status(400).json({'error': error.message});
            }
            else {
                res.status(200).json({'msg': 'User successfully registered.'});
            }
        });
}

function getUsers() {
    db.serialize(() => {
        db.all(`SELECT * FROM users`, (err, rows) => {
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