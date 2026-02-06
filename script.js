const btn = document.getElementById("findEventsBtn");
const weatherSection = document.getElementById("weatherSection");
const locationEl = document.getElementById("location");
const weatherEl = document.getElementById("weather");
const weatherTipEl = document.getElementById("weatherTip");

const API_KEY = "cac0bd29b868d3f7836472caa5b684f2"; // keep quotes

btn.addEventListener("click", () => {
  locationEl.textContent = "Requesting location...";
  weatherEl.textContent = "";
  weatherTipEl.textContent = "";

  if (!navigator.geolocation) {
    locationEl.textContent = "❌ Geolocation not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      weatherSection.classList.remove("hidden");

      locationEl.textContent = `📍 Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

      weatherEl.textContent = "🌐 Fetching weather...";
      weatherTipEl.textContent = "⏳ Waiting for response...";

      try {
        const response = await fetch(url);

        weatherEl.textContent = `🔍 HTTP Status: ${response.status}`;

        if (!response.ok) {
          const errorText = await response.text();
          weatherTipEl.textContent = `❌ API Error: ${errorText}`;
          return;
        }

        const data = await response.json();

        // Debug output
        console.log("Weather API data:", data);

        const temp = data.main.temp;
        const condition = data.weather[0].description;

        weatherEl.textContent = `🌡 ${temp}°F — ${condition}`;

        // Weather tips logic
        let tip = "";

        if (temp <= 32) {
          tip = "❄️ Freezing — bundle up!";
        } else if (temp <= 45) {
          tip = "🧥 Cold — jacket recommended";
        } else if (temp <= 65) {
          tip = "🙂 Cool — light layers";
        } else {
          tip = "😎 Nice out — enjoy!";
        }

        weatherTipEl.textContent = tip;

      } catch (error) {
        weatherEl.textContent = "❌ Fetch failed";
        weatherTipEl.textContent = error.message;
        console.error(error);
      }

      btn.textContent = "Location Found ✅";
    },
    () => {
      locationEl.textContent = "❌ Location permission denied";
    }
  );
});