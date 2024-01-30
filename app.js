//export packages
const path = require('path');
const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

//template engine i.e. .ejs instead of .html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//routes middleware

//first check routes in default file if not found then comes here and check other routes
app.use('/', defaultRoutes);//every request start with "/" since request is at least targeting <your-domain>/something

//restaurant routes
app.use('/', restaurantRoutes);


//custom middleware for 404 page for all request
app.use(function (request, response) {
    response.status(404).render('404');
});

//default error handler middleware
app.use(function (error, request, response, next) {
    response.status(500).render('500');
});

//server port
app.listen(3000);