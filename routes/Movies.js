const Express    = require('express');
const Router     = Express.Router();
const bodyParser = require('body-parser');
const cors       = require('cors');
const { GetMovies, GetReviews, AddMovie, CreateReview } = require('../controllers/Movies');

Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(cors());
Router.use(Express.json());

Router.get('/api/get_movies', GetMovies);
Router.get('/api/get_reviews', GetReviews);
Router.post('/api/add_movie', AddMovie);
Router.post('/api/create_rating', CreateReview);

module.exports = Router;