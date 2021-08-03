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
var uvEl = document.querySelector('#uv');
var descEl = document.querySelector('#desc');
var currIconEl = document.querySelector('#currIcon');


button.addEventListener('click',function() {
    getCurrentWeather(inputValue.value);
    getFutureWeather(inputValue.value);
    saveSearch();
}); 

reset.addEventListener('click',function() {
    
});


// function to get the current weather
var getCurrentWeather = function (cityInput) {

var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityInput +'&units=imperial&appid=6ba1d98ca929f44f2e4eb95a22b0557a';

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
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            //variables to extract date from Unix code
            var a = new Date(data.dt * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = month + ' ' + date + ' ' + year;

            //var and info for displaying the icon
            var iconValue = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconValue + ".png";

            currIconEl.classList.remove("hide");
            currIconEl.src = iconUrl;
            resultsContainer.appendChild(currIconEl);

            getUV(lat, lon);

            //all the info pulled for the weather
            cityEl.innerHTML = cityValue;
            dateEl.innerHTML = time;
            tempEl.innerHTML = tempValue;
            humidityEl.innerHTML = humidityValue;
            windEl.innerHTML = windValue;
            descEl.innerHTML = descValue;

            //saving entry to local storage
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


// function to get future weather (needs editing and finalizing)
var getFutureWeather = function (cityInput) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ cityInput +'&units=imperial&appid=6ba1d98ca929f44f2e4eb95a22b0557a';

    fetch(forecastUrl)
    .then(function (response) {
        if(response.ok) {
        response.json().then(function (data) {
            getForecastInfo(data);

        });
    } else {
        alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
        alert('Unable to connect to Forecast');
    });
};

var getForecastInfo = function (data) {
    for (let i = 3; i < data.list.length; i += 8) {
        console.log(data);
        generateForecastDiv(data.list[i]);
    }
}

var generateForecastDiv = function (cityInfo) {
    console.log(cityInfo);
    var forcastDiv = document.createElement('div');
    forcastDiv.classList = 'futureForecast';
    var humidityText = 'Humidity: ' + cityInfo.main.humidity + ' %';
    var windText = 'Wind Speed: ' + cityInfo.wind.speed + ' MPH';
    var tempText = 'Temp: ' + cityInfo.main.temp + '°F';

    var a = new Date(cityInfo.dt * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ' ' + year;

    var iconValue = cityInfo.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconValue + ".png";

    var dateP = document.createElement('p');
    var currIconLine = document.createElement('img');
    var tempP = document.createElement('p');
    var humidityP = document.createElement('p');
    var windP = document.createElement('p');

    dateP.innerText = time;
    currIconLine.src = iconUrl;
    tempP.innerText = tempText;
    humidityP.innerText = humidityText;
    windP.innerText = windText;

    forcastDiv.appendChild(dateP)
    forcastDiv.appendChild(currIconLine);
    forcastDiv.appendChild(tempP);
    forcastDiv.appendChild(humidityP);
    forcastDiv.appendChild(windP);
    futureContainer.appendChild(forcastDiv);
}

var getUV = function (lat, lon) {
    var uvUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=6ba1d98ca929f44f2e4eb95a22b0557a';

    fetch(uvUrl)
    .then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data)
                var uvValue = data.current.uvi;

                uvEl.innerHTML = 'UV INDEX: ' + uvValue;
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
    .catch(function (error) {
        alert('Unable to Connect to UV');
    });
};

var saveSearch = function () {
    var button = document.createElement('button');
    button.innerText = inputValue.value;
    button.classList.add('btn', 'btn-layout');
    pastSearches.appendChild(button);

    button.addEventListener('click', getCityName);
};

var getCityName = function () {
    getCurrentWeather($(this)[0].innerHTML);   
}

function loadSearch() {
    $('#btn').val(localStorage.pastSearch);
}
