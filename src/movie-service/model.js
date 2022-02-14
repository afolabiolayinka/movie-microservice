const appDatabase = require('./database');

// Create new movie
const createMovie = (title, release, genre, director, createdby, callback) => {
    
    const sql = `INSERT INTO Movies (Title, Released,Genre,Director,CreatedBy,CreatedAt) VALUES (?,?,?,?,?,strftime('%Y-%m-%d %H:%M:%S', datetime('now')))`;
    appDatabase.run(sql, [title, release, genre, director, createdby], (error, row) => {
        if (error) {
            callback(error.message);
        }
        const successMessage = "The movie was created successfully."
        callback(successMessage);
    });
};


// Get all movies from database
const getMovies = (callback) => {
    const sql = `SELECT * FROM Movies`;
    appDatabase.all(sql, [], (error, rows) => {
        if (error) {
            console.error(error.message);
        }
        callback(rows);
    });
};

// Get all movies by user from database
const getMoviesByUser = (userId, callback) => {
    const sql = `SELECT * FROM Movies WHERE CreatedBy = ` + userId;
    appDatabase.all(sql, [], (error, rows) => {
        if (error) {
            console.error(error.message);
        }
        callback(rows);
    });
};

const countMoviesByUser = (userId, callback) => {
    const sql = `SELECT * FROM Movies WHERE CreatedBy = ` + userId + ` AND strftime('%Y-%m',CreatedAt)=strftime('%Y-%m','now')`;
    appDatabase.all(sql, [], (error, rows) => {
        if (error) {
            console.error(error.message);
        }
        return callback(rows.length);
    });
};


/*const countMoviesByUserX = async (userId) => {
    var length = 0;
    const sql = `SELECT * FROM Movies WHERE CreatedBy = ` + userId + ` AND strftime('%Y-%m',CreatedAt)=strftime('%Y-%m','now')`;
    let result = await appDatabase.all(sql);
    
    console.log('AWAIT:',result.rows.length);
    return length;
};*/

const countMoviesByUserX = function(userId){
    return new Promise(function (resolve, reject) {
      var responseObj;
      const sql = `SELECT * FROM Movies WHERE CreatedBy = ` + userId + ` AND strftime('%Y-%m',CreatedAt)=strftime('%Y-%m','now')`;
      appDatabase.all(sql, function cb(err, rows) {
        if (err) {
          responseObj = {
            'error': err
          };
          reject(responseObj);
        } else {
          responseObj = {
            statement: this,
            rows: rows.length
          };
          resolve(responseObj);
        }
      });
    });
  }

// Export models
module.exports = {
    createMovie,
    getMovies,
    countMoviesByUser,
    countMoviesByUserX,
};
