const express = require('express');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const {get_movies,create_movie} = require('./controller');

//  Create route handler
const router = express.Router();

// GET Index Page
router.get('/movies', authenticateToken, get_movies);
router.post('/movies', authenticateToken, create_movie)

// middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

// Export router
module.exports = router;
