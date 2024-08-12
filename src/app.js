const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Setup static directiory to serve
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Vadim Mokhno' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Vadim Mokhno' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help Me!!!!',
    title: 'Help',
    name: 'Vadim Mokhno',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address' });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast({ longitude, latitude }, (error, weatherDescription) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          weatherDescription,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 page',
    name: 'Vadim Mokhno',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    name: 'Vadim Mokhno',
    errorMessage: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
