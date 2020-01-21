const request = require('request');
const constants = require('./constants');

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/${constants.darkskyKey}/${lat},${lng}?units=si`

    request({url, json: true}, (error, response) => {
        if(error) {
            return callback("Unable to connect to forecast services", callback);
        } else if (response.body.error){
            return callback('Unable to find location', undefined);
        }

        callback(undefined, `${response.body.daily.data[0].summary}. It is currently ${response.body.currently.temperature} degress out. There is a ${response.body.currently.precipProbability}% chance of rain`);

    });
}

module.exports = forecast;