const request = require('request');
const constants = require('./constants');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${constants.mapboxKey}`

    request({ url, json: true}, (error, response) => {
        if(error) {
            return callback('Unable to connect to location services', undefined);
        } else if(response.body.features.length === 0) {
            return callback('Unable to find searched location', undefined);
        }

        callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        });

    });
}

module.exports = geocode;