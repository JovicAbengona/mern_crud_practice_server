const db = require('../config');

module.exports = {
    GetMoviesQuery: async () => {
        return await db.execute("SELECT id, name, release_year FROM movies;");
    },
    GetReviewsQuery: async () => {
        return await db.execute(`SELECT
                                    movies.id AS movie_id, movies.name AS movie_name,
                                    movie_reviews.id AS movie_review_id, CONCAT(movie_reviews.first_name, ' ', movie_reviews.last_name) AS full_name, movie_reviews.email_address, movie_reviews.review, movie_reviews.rating, movie_reviews.created_at
                                FROM movie_reviews
                                INNER JOIN movies ON movies.id = movie_reviews.movie_id
                                ORDER BY movie_review_id DESC;`);
    },
    AddMovieQuery: async (req, res) => {
        const form_data = req.body.form_data;

        return await db.execute(`INSERT INTO movies (name, release_year, created_at, updated_at)
                                        VALUES (?, ?, NOW(), NOW());`, 
                                        [form_data.name, form_data.release_year]);
    },
    CreateReviewQuery: async (req, res) => {
        const form_data = req.body.form_data;

        let is_valid = false;

        if((('movie_id' in form_data) && ('first_name' in form_data) && ('last_name' in form_data) && ('email_address' in form_data) && ('review' in form_data) && ('rating' in form_data)) && 
            (
                (form_data.movie_id != null && form_data.movie_id != "") && 
                (form_data.first_name != null && form_data.first_name != "") && 
                (form_data.last_name != null && form_data.last_name != "") && 
                (form_data.email_address != null && form_data.email_address != "") && 
                (form_data.review != null && form_data.review != "") && 
                (form_data.rating != null && form_data.rating != "")
            )
        )
            is_valid = true

        if(is_valid){
            return await db.execute(`INSERT INTO movie_reviews (movie_id, first_name, last_name, email_address, review, rating, created_at, updated_at)
                                        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW());`, 
                                        [form_data.movie_id, form_data.first_name, form_data.last_name, form_data.email_address, form_data.review, form_data.rating]);
        }
    }
};