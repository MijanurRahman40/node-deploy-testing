const request = require('request');

const forecast = function (latitude, longitude, callback) {
    const url = 'https://api.darksky.net/forecast/9bfa8cfc38d6b1a4044aa4b94d19d94e/' + latitude + ',' + longitude + '?auto';
    // object 
    request({url, json: true}, function (error, {body}) {
        if (error) {
            callback('Unable to connect weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            // callback(undefined, 'It is currently ' + response.body.currently.temperature + ' degrees out.There is a ' + response.body.currently.precipProbability + '% chance of rain.');
            callback(undefined,
                //     {
                //     temperature: body.currently.temperature,
                //     precipProbability: body.currently.precipProbability,
                //     humidity: body.currently.humidity
                //    }
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' fahrenheit out.This high today is ' + body.daily.data[0].temperatureHigh + 'with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.'
            );
        }
    });
};
module.exports = forecast;

