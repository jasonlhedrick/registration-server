const jwt = require('jsonwebtoken');

function signToken(id) {
    return jwt.sign({data: id}, 'secret', {expiresIn: '30d'});
}

function verifyToken(token) {
    return jwt.verify(token, 'secret');
}

module.exports = {
    signToken,
    verifyToken,
}