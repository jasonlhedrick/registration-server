const express = require('express');
const cors = require('cors');
const db = require('./db_modules/db_users');

db.createUserTable();
db.insertUser('test', 'test', 'test@test');
db.getUsers();
db.dropUsersTable();

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