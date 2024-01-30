const resData = require('../util/restaurant-data');//importing from files
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

router.get('/restaurants', function (request, response) {
    // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    // response.sendFile(htmlFilePath);
    let order = request.query.order;
    let nextOrder = 'desc'
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }

    if (order === 'desc') {
        nextOrder = 'asc';
    }

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.sort(function (resA, resB) {
        if (order === 'asc' && resA.name > resB.name) {
            return 1;
        } else if (order === 'desc' && resA.name < resB.name) {
            return 1;
        } else {
            return -1;
        }
    });

    response.render('restaurants', { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants, nextOrder: nextOrder });
});

router.get('/restaurants/:id', function (request, response) {
    const restaurantId = request.params.id;
    const storedRestaurants = resData.getStoredRestaurants();

    for (const res of storedRestaurants) {
        if (res.id === restaurantId) {
            return response.render('restaurant-detail', { restaurant: res });
        }
    }
    response.status(404).render('404');
});

router.get('/recommend', function (request, response) {
    // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    // response.sendFile(htmlFilePath);
    response.render('recommend');
});

router.post('/recommend', function (request, response) {
    // const restaurantName = request.body.name
    const restaurant = request.body;
    restaurant.id = uuid.v4();
    const restaurants = resData.getStoredRestaurants();

    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    response.redirect('/confirm');
});

router.get('/confirm', function (request, response) {
    // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    // response.sendFile(htmlFilePath);
    response.render('confirm');
});

module.exports = router;