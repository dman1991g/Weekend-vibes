const btn = document.getElementById("findEventsBtn");
const weatherSection = document.getElementById("weatherSection");
const eventsSection = document.getElementById("eventSection");

const API_KEY = "cac0bd29b868d3f7836472caa5b684f2"; // keep quotes

btn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  btn.textContent = "Getting your location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log("Latitude:", lat);
      console.log("Longitude:", lon);

      weatherSection.classList.remove("hidden");
      eventsSection.classList.remove("hidden");

      fetchWeather(lat, lon);
    },
    (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to retrieve your location");
      btn.textContent = "Find Events Near Me";
    }
  );
});

function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

  console.log("Weather API URL:", url);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather API response:", data);

      const temp = data.main.temp;
      const condition = data.weather[0].main;

      document.getElementById("location").textContent =
        `Your location: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;

      document.getElementById("weather").textContent =
        `${condition} — ${Math.round(temp)}°F`;

      // ✅ FIXED WEATHER TIP LOGIC
      let tip = "";

      if (temp <= 40) {
        tip = "🧥 It’s cold out — bundle up!";
      } else if (condition === "Rain") {
        tip = "🌧 Bring an umbrella.";
      } else if (condition === "Snow") {
        tip = "❄️ Dress warm and watch for ice.";
      } else if (condition === "Clear") {
        tip = "☀️ Clear skies — nice day to get out.";
      } else if (condition === "Clouds") {
        tip = "☁️ Cloudy, but still fine for plans.";
      } else {
        tip = "🙂 Weather looks okay today.";
      }

      document.getElementById("weatherTip").textContent = tip;

      btn.textContent = "Location Found ✅";
    })
    .catch((error) => {
      console.error("Weather fetch failed:", error);
      document.getElementById("weather").textContent =
        "Unable to load weather data.";
      document.getElementById("weatherTip").textContent =
        "Weather tips unavailable.";
    });
}