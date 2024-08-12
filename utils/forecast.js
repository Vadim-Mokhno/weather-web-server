const request = require('request');

const forecast = ({ latitude, longitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c6736b7229286df1cc3ec249800b99c0&query=${latitude},${longitude}`;
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out.`
      );
    }
  });
};

module.exports = forecast;
