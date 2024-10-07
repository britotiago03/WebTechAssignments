document.addEventListener("DOMContentLoaded", function () {
  const weatherContainer = document.querySelector(".weather-info-container");

  const locations = [
    {
      name: "Oslo, Norway",
      latitude: 59.9139,
      longitude: 10.7522,
      countryCode: "no",
      imageName: "oslo.jpg"
    },
    {
      name: "Lisbon, Portugal",
      latitude: 38.7223,
      longitude: -9.1393,
      countryCode: "pt",
      imageName: "lisbon.jpg"
    },
    {
      name: "Toronto, Canada",
      latitude: 43.6532,
      longitude: -79.3832,
      countryCode: "ca",
      imageName: "toronto.jpg"
    },
    { name: "Manila, Philippines",
      latitude: 14.5995,
      longitude: 120.9842,
      countryCode: "ph",
      imageName: "manila.jpg" },
    {
      name: "Bangkok, Thailand",
      latitude: 13.7563,
      longitude: 100.5118,
      countryCode: "th",
      imageName: "bangkok.jpg"
    }
  ];

  function getTimeOfDay(hour) {
    if (hour >= 5 && hour < 12) return { timeOfDay: "Morning", emoji: "🌅" };
    if (hour >= 12 && hour < 17) return { timeOfDay: "Afternoon", emoji: "🌞" };
    if (hour >= 17 && hour < 20) return { timeOfDay: "Evening", emoji: "🌇" };
    return { timeOfDay: "Night", emoji: "🌃" };
  }

  function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Light rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Light snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail"
    };
    return weatherDescriptions[weatherCode] || "Unknown";
  }

  function fetchWeather() {
    locations.forEach((location, index) => {
      const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
      const apiUrl = 'https://api.open-meteo.com/v1/forecast';
      const url = `${proxyUrl}${apiUrl}?latitude=${location
          .latitude}&longitude=${location
          .longitude}&current_weather=true&timezone=auto`;

      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Failed to fetch weather data for ${location.name}`);
      })
      .then(data => {
        const weather = data.current_weather;

        const localTime = new Date(weather.time);
        const { timeOfDay, emoji } =
            getTimeOfDay(localTime.getHours());
        const weatherDescription =
            getWeatherDescription(weather.weathercode);

        const weatherDiv =
            document.querySelector(`#location-${index}`);
        setWeatherDiv(location, weatherDiv, localTime, timeOfDay, emoji, weather,
            weatherDescription);

      })
      .catch(error => {
        console.error(error.message);
      });
    });
  }

  function setWeatherDiv(location, weatherDiv, localTime, timeOfDay, emoji,
                         weather, weatherDescription) {
    weatherDiv.innerHTML = `
              <img class="city-image" 
              src="../assets/cities/${location.imageName}" 
              alt="${location.name}">
              <div class="weather-header">
                  <img class="country-flag" 
                  src="https://flagcdn.com/w320/${location.countryCode}.png"
                   alt="Flag of ${location.name}">
                  <h3>${location.name}</h3>
              </div>
              <div class="weather-details">
                  <p>Local Time: ${localTime.toLocaleTimeString(
        [],
        { hour: '2-digit', minute: '2-digit' })}</p>
                  <p>Time of Day: ${timeOfDay} <span 
                  class="emoji">${emoji}</span></p>
                  <p>Temperature: ${weather.temperature}°C</p>
                  <p>Windspeed: ${weather.windspeed} km/h</p>
                  <p>Wind Direction: ${weather.winddirection}°</p>
                  <p>Weather: ${weatherDescription}</p>
              </div>
          `;
  }

  weatherContainer.innerHTML = locations.map((_, index) => `
      <div id="location-${index}" class="weather-info">
          <p>Loading weather data...</p>
      </div>
  `).join("");

  fetchWeather();

  setInterval(fetchWeather, 5 * 60 * 1000);
});
