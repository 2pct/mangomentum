const API_KEY = "70f41c6b8cf5b0b3444d9713088cccc1";
const COORDS = "coords";
const tempCity = document.querySelector(".js-weather");
const icon = document.createElement("i");
const weatherDes = document.createElement("p");


const weatherIcon = {
"clear sky": "wi-day-sunny",
"few clouds": "wi-day-cloudy",
"scattered clouds": "wi-cloud",
"broken clouds": "wi-cloudy",
"shower rain": "wi-showers",
"rain": "wi-rain",
"thunderstorm": "wi-thunderstorm",
"snow": "wi-snowflake-cold",
"mist": "wi-dust"
}


function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const weatherInfo = json.weather[0]["description"];
        console.log(`${weatherInfo}`);

        const place = json.name;
        const temp = json.main.temp;

        tempCity.innerText = `${temp}° | ${place}`;

        icon.className = `wi ${weatherIcon[weatherInfo]}`;
        tempCity.append(icon);
        weatherDes.className = "weatherDes";
        weatherDes.innerText = `${weatherInfo}`;
        weatherDes.classList.add("hide");
        tempCity.append(weatherDes);


    });
}

function showDes(){
    weatherDes.classList.remove("hide");
}

function hideDes(){
    weatherDes.classList.add("hide");

}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
}

function handleGeoError(){
    console.log("Can't access geolocation");
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
    icon.addEventListener("mouseenter", showDes);
    icon.addEventListener("mouseleave", hideDes);

}

init();