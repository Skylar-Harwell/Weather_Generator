var button = document.querySelector('.button');
var reset = document.querySelector('.reset');
var inputValue = document.querySelector('.inputValue');
var resultsContainer = document.querySelector('#results');
var futureContainer = document.querySelector('#future');
var pastSearches = document.querySelector('#past');
var cityEl = document.querySelector('#city');
var dateEl = document.querySelector('#date');
var tempEl = document.querySelector('#temp');
var humidityEl = document.querySelector('#humidity');
var windEl = document.querySelector('#wind');
var descEl = document.querySelector('#desc');


button.addEventListener('click',function() {

var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=6ba1d98ca929f44f2e4eb95a22b0557a';

fetch(weatherUrl)
    .then(function (response) {
        if(response.ok) {
        response.json().then(function (data) {
            console.log(data);
            var cityValue = 'City: ' + data.name;
            // var dateValue = (data.dt).format('MM/DD/YYYY');
            var humidityValue = 'Humidity: ' + data.main.humidity + ' %';
            var windValue = 'Wind Speed: ' + data.wind.speed + ' MPH';
            var tempValue = 'Temp: ' + data.main.temp;
            var descValue = 'Description: ' + data['weather'][0]['description'];


            cityEl.innerHTML = cityValue;
            // dateEl.innerHTML = dateValue;
            tempEl.innerHTML = tempValue;
            humidityEl.innerHTML = humidityValue;
            windEl.innerHTML = windValue;
            descEl.innerHTML = descValue;
    });
    } else {
        alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
        alert('Unable to connect to Weather');
    });
});

var getCurrentWeather = function () {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&units=imperial&appid=6ba1d98ca929f44f2e4eb95a22b0557a';

    fetch(forecastUrl)
    .then(function (response) {
        if(response.ok) {
        response.json().then(function (data) {
            console.log(data);
        });
    } else {
        alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
        alert('Unable to connect to Weather');
    });
};

reset.addEventListener('click',function() {
    getCurrentWeather();
});