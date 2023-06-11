const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");

searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  // Set default location to Delhi if the query is empty
  if (!query) {
    query = "Delhi";
  }

  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

// Call getResults() with empty query to show Delhi weather by default
getResults("");

function displayResults(weather) {
  console.log(weather);
  document.body.style.backgroundImage = getBackgroundImage(weather.main.temp, weather.weather[0].main);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function getBackgroundImage(temperature, weatherCondition) {
  let backgroundImage;

  if (temperature >= 30) {
    if (weatherCondition === "Haze") {
      backgroundImage = "url(https://www.science.org/do/10.1126/science.abq8448/abs/_20220504_on_exaggerated-climate-impacts.jpg)";
    } else {
      backgroundImage = "url(https://wallpaperstock.net/spring-grass--bright-sun_wallpapers_38834_2560x1600.jpg)";
    }
  } else if (temperature >= 20 && temperature < 30) {
    if (weatherCondition === "Sunny") {
      backgroundImage = "url(https://cdn.fansshare.com/images/sunny/sunny-day-wallpaper-weather-667128782.jpg)";
    } else if (weatherCondition === "Rain") {
      backgroundImage = "url(https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?w=2000)";
    } else {
      backgroundImage = "url(https://wallpapercrafter.com/desktop7/1712178-sky-blue-cloud-cloudy-background-weather-sunny.jpg)";
    }
  } else if (temperature >= 10 && temperature < 20) {
    if (weatherCondition === "Rain") {
      backgroundImage = "url(https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?w=2000)";
    } else {
      backgroundImage = "url(https://media.self.com/photos/63925acb8b930311f19583e4/4:3/w_2560%2Cc_limit/AdobeStock_322765984.jpeg)";
    }
  } else {
    backgroundImage = "url(https://wallpapercrafter.com/desktop7/1712178-sky-blue-cloud-cloudy-background-weather-sunny.jpg)";
  }

  return backgroundImage;
}



function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
