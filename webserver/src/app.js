const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Weather app',
        name: 'Ahmad Khatib'
    });
});

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.json({
            error: true,
            errorMessage: 'No address was provided'
        });
    }

    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.json({
                error: true,
                errorMessage: error
            });
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return res.json({
                    error: true,
                    errorMessage: error
                });
            }

            res.json({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            });
        });
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Weather app',
        name: 'Ahmad Khatib'
    });
});

app.get('/about/*', (req, res) => {
    res.render('error/404', {
        pageTitle: 'About page not found',
        name: 'Ahmad Khatib',
        errorMessage: 'The requested about article was not found'
    });
});

app.get('*', (req, res) => {
    res.render('error/404', {
        pageTitle: 'Page not found',
        name: 'Ahmad Khatib',
        errorMessage: 'The requested page was not found'
    });
});

//Setup server port to listen for requests
app.listen(3000, () => {
    console.log('server up');
});