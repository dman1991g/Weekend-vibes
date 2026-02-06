const btn = document.getElementById("findEventsBtn");
const weatherSection = document.getElementById("weatherSection");
const eventsSection = document.getElementById("eventSection");

const API_KEY = "405aaf6e09ebcac783d20cf3fb935b6e"; // 👈 replace this

btn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  btn.textContent = "Getting your location...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log("Latitude:", lat);
      console.log("Longitude:", lon);

      // Show sections
      weatherSection.classList.remove("hidden");
      eventsSection.classList.remove("hidden");

      try {
        // 🌦️ Weather API call
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log("Weather API response:", data);

        // Location name
        document.getElementById("location").textContent =
          data.name || "Your Location";

        // Weather summary
        document.getElementById("weather").textContent =
          `${Math.round(data.main.temp)}°F • ${data.weather[0].main}`;

        // Weather tips
        const temp = data.main.temp;
        const condition = data.weather[0].main.toLowerCase();

        let tip = "Have a great day!";

        if (condition.includes("rain")) {
          tip = "🌧️ Bring an umbrella!";
        } else if (temp < 40) {
          tip = "🧥 It’s cold — bundle up!";
        } else if (temp > 85) {
          tip = "🥵 Stay hydrated!";
        } else if (condition.includes("clear")) {
          tip = "☀️ Perfect weather for outdoor events!";
        }

        document.getElementById("weatherTip").textContent = tip;

        // Placeholder for events (next step)
        document.getElementById("eventsContainer").textContent =
          "Events will load here soon 🎉";

        btn.textContent = "Weather Loaded ✅";
      } catch (error) {
        console.error(error);
        alert("Failed to load weather data");
        btn.textContent = "Try Again";
      }
    },
    (error) => {
      console.error(error);
      alert("Unable to retrieve your location");
      btn.textContent = "Find Events Near Me";
    }
  );
});