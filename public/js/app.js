console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastMessage = document.querySelector('.forecast');
const locationMessage = document.querySelector('.location');
const errorMessage = document.querySelector('.error');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  forecastMessage.textContent = 'Loading...';
  locationMessage.textContent = '';
  errorMessage.textContent = '';
  const address = search.value;
  fetch(`https://weather-web-server-9lwg.onrender.com/weather?address=${address}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        forecastMessage.textContent = '';
        errorMessage.textContent = 'Error: ' + data.error;
      } else {
        forecastMessage.textContent = 'Forecast: ' + data.weatherDescription;
        locationMessage.textContent = 'Location: ' + data.location;
      }
    });
  });
});
