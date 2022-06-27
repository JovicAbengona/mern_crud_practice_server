const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const app        = express();
const mysql      = require('mysql2');
const db         = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'qqqrwqeqwqeqS6',
    database: 'mern_crud_db'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get_movies', (req, res) => {
    db.query("SELECT id, name, release_year FROM movies;", (err, result) => {
        res.send(result);
    });
});

app.get('/api/get_reviews', (req, res) => {
    db.query(`SELECT
            movies.id AS movie_id, movies.name AS movie_name,
            movie_reviews.id AS movie_review_id, CONCAT(movie_reviews.first_name, ' ', movie_reviews.last_name) AS full_name, movie_reviews.email_address, movie_reviews.review, movie_reviews.rating, movie_reviews.created_at
        FROM movie_reviews
        INNER JOIN movies ON movies.id = movie_reviews.movie_id
        ORDER BY movie_review_id DESC;`, 
        (err, result) => {
            res.send(result);
    });
});

app.post('/api/create_rating', (req, res) => {
    const form_data = req.body.form_data;

    db.query(`INSERT INTO movie_reviews (movie_id, first_name, last_name, email_address, review, rating, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW());`, 
        [form_data.movie_id, form_data.first_name, form_data.last_name, form_data.email_address, form_data.review, form_data.rating], 
        (err, result) => {
            res.send(result);
        })
});

app.listen(3001, () => {
    console.log('Server running on port: 3001');
});