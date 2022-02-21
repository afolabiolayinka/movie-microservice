const express = require('express');
const { createMovie, getMovies, countMoviesByUser, countMoviesByUserX } = require('./model');
const { validationResult, check } = require('express-validator');
const http = require('http');
const querystring = require('querystring');
const { JWT_SECRET } = process.env;
const omdbapiURL = "http://www.omdbapi.com";
const appDatabase = require('./database');


const validateMovie = [
    check('Title')
        .isLength({ min: 1, max: 1000 })
        .withMessage("The title must have between 1 and 1000 characters")
];

function get_movies(request, response) {
    getMovies((queryResult) => {
        console.log(queryResult);
        response.status(200).json({ movies: queryResult });
    });
}

function countRows(userId) {
    var limit = 0;
    countMoviesByUser(userId, (queryResult) => {
        return queryResult;
    });
    return limit;
}

// POST
function create_movie(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.mapped() });
    }

    if (request.user.role == "basic") {
        countMoviesByUser(request.user.userId, (queryResult) => {
            if (queryResult > 4) {
                return response.status(400).json({ error: "Limit reached for the month" });
            } else {
                do_save(request, response);
            }
        });
    } else {

        do_save(request, response);
    }
}

function do_save(request, response) {
    const parameter = {
        apikey: JWT_SECRET,
        t: request.body.Title,
    };

    http.get(omdbapiURL + "?" + querystring.stringify(parameter), res => {

        var title = "";
        var released = "";
        var genre = "";
        var director = "";
        var createdBy;
        let data = "";

        res.on('data', chunk => {
            data = data + chunk.toString();
        });

        res.on('end', () => {

            const body = JSON.parse(data);

            if (body.Response == 'False') {
                return response.status(400).json({ error: body.Error });
            }

            title = body.Title;
            released = body.Released;
            genre = body.Genre;
            director = body.Director;
            createdBy = request.user.userId;

            createMovie(title, released, genre, director, createdBy, (queryResult) => {
                return response.status(200).json({ status: "OK", message: queryResult });
            });
        });
    }).on('error', err => {
        return response.status(400).json({ error: err.message });
    });
}

// Export models
module.exports = {
    get_movies,
    create_movie,
};
