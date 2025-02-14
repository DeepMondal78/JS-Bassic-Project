const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', ()=> {

    const ApIKey = '4fc78a923254846221a430089f1443f8';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApIKey}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
          error404.classList.remove('fadeIn');

          const imgae = document.querySelector('.weather-box img');
          const temperature = document.querySelector('.weather-box .temperature');
          const description = document.querySelector('.weather-box .description');
          const humidity = document.querySelector('.weather-details .humidity span');
          const wind = document.querySelector('.weather-details .wind span');

          switch (json.weather[0].main) {
            case 'Clear':
                imgae.src = 'images/clear.png';
                break;

            case 'Rain':
                imgae.src = 'images/rain.png';
                break;

            case 'Snow':
                imgae.src = 'images/snow.png';
                break;

            case 'Clouds':
                imgae.src = 'images/cloud.png';
                break;

            case 'Haze':
                imgae.src = 'images/mist.png';
                break;
            
            default:
                imgae.src = '';
          }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `Humidity: ${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });

});