const container = document.querySelector(".container");
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box .search-btn");

const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const APIKey = "YOUR_API_KEY_HERE"; // <-- put your OpenWeather key here

function fetchWeather(city) {
  if (!city) return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      // City not found
      if (json.cod === "404") {
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";

        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = weatherBox.querySelector("img");
      const temperature = weatherBox.querySelector(".temperature");
      const description = weatherBox.querySelector(".description");
      const humidity = weatherDetails.querySelector(".humidity span");
      const wind = weatherDetails.querySelector(".wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Haze":
        case "Mist":
        case "Fog":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "images/clear.png";
      }

      // City name in uppercase like your design
      searchBox.value = json.name.toUpperCase();

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.textContent = json.weather[0].description
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");

      humidity.textContent = `${json.main.humidity}%`;
      wind.textContent = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "block";
      weatherDetails.style.display = "flex";

      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");

      setTimeout(() => {
        weatherBox.classList.remove("fadeIn");
        weatherDetails.classList.remove("fadeIn");
      }, 500);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  fetchWeather(city);
});

searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    fetchWeather(city);
  }
});
