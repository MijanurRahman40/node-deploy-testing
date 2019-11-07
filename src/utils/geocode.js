const request = require('request');
const geocode = function (address, callback)
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFqdTMxNDE2IiwiYSI6ImNqdTN0MGE2dDBxanIzeW43MDYwNWJ3MmQifQ.52Dpg-LsObJSZifYkk07Cg&limit=1'

    request({ url: url, json: true }, function (error, response)
    {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location, Try again later', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            });
        }
    });
}  

module.exports = geocode;