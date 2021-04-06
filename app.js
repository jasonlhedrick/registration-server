const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = require('./db_modules/db_users');
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

app.post('/user', (req, res) => {
    // Get the user information off the request handler
    const user = req.body;

    if (!(user.username && user.password && user.email)) 
    {
        res.status(400).json({'error': 'Please ensure registrations contain a username password and email.'});
    }
    else {
        bcrypt.hash(user.password, 12)
        .then(result => {
            user.password = result;
            db.insertUser(res, user);
        });
    }
});

app.put('/user:id', async (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})