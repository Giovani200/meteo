'use strict';
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherInfos = document.querySelector('.weather-infos');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = '547e419015edd9057d55a3065e65a2a3';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherInfos.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-infos .humidity span');
        const wind = document.querySelector('.weather-infos .wind span');

        if (json.weather && json.weather[0]){
            switch (json.weather[0].main) {
              case 'Clear':
                image.src = 'img/clear.jpg';
                break;
              case 'Rain':
                image.src = 'img/rain.jpg';
                break;
              case 'Clouds':
                image.src = 'img/clouds.jpg';
                break;
              case 'Haze':
                image.src = 'img/haze.png';
                break;
              default:
                image.src = '';
            }
          }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

        weatherBox.style.display = '';
        weatherInfos.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherInfos.classList.add('fadeIn');
        container.style.height = '700px';
    })
    .catch(error => console.error('Error:', error));
});