const express = require('express');
const router = express.Router();//work same as app but works differently inside

router.get('/', function (request, response) {
    // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    // response.sendFile(htmlFilePath);
    response.render('index');//because we use template engine ejs
});

router.get('/about', function (request, response) {
    // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    // response.sendFile(htmlFilePath);
    response.render('about');
});

module.exports = router;