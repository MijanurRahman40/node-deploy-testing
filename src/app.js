const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

// define pats for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/**
 * HBS is a template engine handler
 * it has default views directory is called views
 */

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/weather', function (request, response) {
    if (!request.query.address) {
        return response.send({
            error: 'You must provide an address'
        })
    }
    // response.render('index', {
    //     title: 'weather App',
    //     name: 'Apple Mia'
    // });
    // response.send({
    //   forecast : 'It is showing',
    //   location : 'Bangladesh',
    //   address : request.query.address
    // });

    //destructuring
    geocode(request.query.address, function (error, {location, latitude, longitude} = {}) {
        if (error) {
            return response.send({error});
        }
        forecast(latitude, longitude, function (error, forecastData) {
            if (error) {
                return response.send({error});
            }
            const celsiusTemperature = (forecastData.temperature - 32) * (5 / 9);
            forecastData.humidity = forecastData.humidity * 100 + "%";
            forecastData.precipProbability = forecastData.precipProbability + "%";
            forecastData.temperature = celsiusTemperature.toFixed(2) + "^C";
            response.send({
                forecast: forecastData,
                location: location,
                address: request.query.address
            });
        });
    });
});

app.get('/products', function (request, response) {
    if (!request.query.search) {
        return response.send({
            error: 'You must provide a search here'
        });
    }
    console.log(request.query.search);
    response.send({
        products: []
    });
});

app.get('/help', function (request, response) {
    response.render('help', {
        title: 'This is title',
        helpText: 'This is a help text',
    });
});

// app.get('', function (request, response)
// {
//     response.send('Hello express');
// });

// app.get('/help', function (request, response)
// {
//     response.send('Help Page...');
// });

// app.get('/about', function (request, response)
// {
//     response.send('<h1>This is about page</h1>');
// });

// app.get('/weather', function (request, response)
// {
//     // when we pass an object express js knows the it is object then it convert 
//     // into JSON object
//     response.send([
//         {
//             name: 'Apple',
//             email: '123445'
//         },
//         {
//             name: 'Orange',
//             email: 'apple@gmail.com'
//         }
//     ]);
// });

app.get('/help/*', function (request, response) {
    response.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    });
});

app.get('', function (request, response) {
    response.render('index', {
        title: 'Weather App',
    });
});

app.get('*', function (request, response) {
    response.render('404', {
        title: '404',
        errorMessage: 'Page not found...'
    });
});
//app.com/about

app.listen(port, function () {
    console.log('Server is running up on port ' + port);
});