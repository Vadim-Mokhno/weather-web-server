const request = require('request');

const geocode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmFkeW0tbW9raG5vIiwiYSI6ImNsdjhka2l6MTA3ZWkycXMzdncxdW01eTEifQ.1OKNOLtaqucAIek8mLjO9g&limit=1`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to geocoding service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const [longitude, latitude] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geocode;
