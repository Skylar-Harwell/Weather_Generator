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
var currIconEl = document.querySelector('#currIcon');


button.addEventListener('click',function() {
    getCurrentWeather();
    saveSearch();
}); 

reset.addEventListener('click',function() {
    getFutureWeather();
});

var getCurrentWeather = function () {

var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=6ba1d98ca929f44f2e4eb95a22b0557a';

fetch(weatherUrl)
    .then(function (response) {
        if(response.ok) {
        response.json().then(function (data) {
            console.log(data);
            var cityValue = 'City: ' + data.name;
            var humidityValue = 'Humidity: ' + data.main.humidity + ' %';
            var windValue = 'Wind Speed: ' + data.wind.speed + ' MPH';
            var tempValue = 'Temp: ' + data.main.temp + '°F';
            var descValue = 'Description: ' + data.weather[0].description;

            var a = new Date(data.dt * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = month + ' ' + date + ' ' + year;

            var iconValue = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconValue + ".png";

            currIconEl.classList.remove("hide");
            currIconEl.src = iconUrl;
            resultsContainer.appendChild(currIconEl);

            cityEl.innerHTML = cityValue;
            dateEl.innerHTML = time;
            tempEl.innerHTML = tempValue;
            humidityEl.innerHTML = humidityValue;
            windEl.innerHTML = windValue;
            descEl.innerHTML = descValue;

            localStorage.pastSearch = inputValue.value;
    });

    } else {
        alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
        alert('Unable to connect to Weather');
    });
};

var getFutureWeather = function () {
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

var saveSearch = function () {
    var button = document.createElement('button');
    button.innerText = inputValue.value;
    button.classList.add('btn');
    pastSearches.appendChild(button);
    button.addEventListener('click', getCurrentWeather)
};

function loadSearch() {
    $('#btn').val(localStorage.pastSearch);
}
