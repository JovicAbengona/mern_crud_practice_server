const { GetMoviesQuery, GetReviewsQuery, AddMovieQuery, CreateReviewQuery } = require('../models/Movie');

module.exports = {
    GetMovies: async (req, res) => {
        const movies_list = await GetMoviesQuery();
    
        return res.json(movies_list);
    },
    GetReviews: async (req, res) => {
        const reviews_list = await GetReviewsQuery();
    
        return res.json(reviews_list);
    },
    AddMovie: async (req, res) => {
        const add_movie = await AddMovieQuery(req);
    
        return res.json(add_movie);
    },
    CreateReview: async (req, res) => {
        const create_review = await CreateReviewQuery(req);
    
        return res.json(create_review);
    }
};