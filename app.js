const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/users.db', (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to the users database.');
});

function createUserTable(db) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                hash TEXT NOT NULL,
                email TEXT NOT NULL)`
            )
    });
}

async function insertUser(db, username, hash, email) {
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

function getUsers(db) {
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

function dropUsersTable(db) {
    db.serialize(() => {
        db.all('DROP TABLE users', (err, res) => {
            if(err) {
                console.log(err.message);
                throw err;
            }
        })
    })
}

createUserTable(db);
insertUser(db, 'test', 'test', 'test@test');
getUsers(db);
dropUsersTable(db);
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 4000;

app.get('/', (req, res) => {
    res.status(200).json({message: `Server is listening on port: ${PORT}`})
});

// User CRUD
app.get('/user:id', async (req, res) => {

});

app.post('/user', async (req, res) => {
    // Get the user information off the request handler
    const user = req.body;
});

app.put('/user:id', async (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})