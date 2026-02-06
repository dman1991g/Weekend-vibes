const btn = document.getElementById("findEventsBtn");
const weatherSection = document.getElementById("weatherSection");

const locationEl = document.getElementById("location");
const weatherEl = document.getElementById("weather");
const weatherTipEl = document.getElementById("weatherTip");

const API_KEY = "cac0bd29b868d3f7836472caa5b684f2";

btn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  btn.textContent = "Getting your location…";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log("Coordinates:", lat, lon);

      weatherSection.classList.remove("hidden");

      // Always show coords first (proves DOM works)
      locationEl.textContent = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
      weatherEl.textContent = "Fetching weather…";
      weatherTipEl.textContent = "";

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
      console.log("Weather URL:", url);

      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Weather API response:", data);

        if (!response.ok) {
          weatherEl.textContent = "Weather API error ❌";
          weatherTipEl.textContent = data.message;
          return;
        }

        // FORCE visible output
        const city = data.name || "Your Area";
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;

        locationEl.textContent = `${city} (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
        weatherEl.textContent = `${temp}°F — ${condition}`;
        weatherTipEl.textContent = "Weather data loaded successfully ✅";

        btn.textContent = "Location Found ✅";

      } catch (err) {
        console.error(err);
        weatherEl.textContent = "Fetch failed ❌";
        weatherTipEl.textContent = err.message;
      }
    },
    () => {
      alert("Location permission denied");
      btn.textContent = "Find Events Near Me";
    }
  );
});