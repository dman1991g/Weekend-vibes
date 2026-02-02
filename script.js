const btn = document.getElementById("findEventsBtn");
const weatherSection = document.getElementById("weatherSection");
const eventsSection = document.getElementById("eventsSection");

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

      // Show the sections
      weatherSection.classList.remove("hidden");
      eventsSection.classList.remove("hidden");

      // Update text in existing elements (DO NOT use innerHTML)
      const locationEl = document.getElementById("location");
      const weatherEl = document.getElementById("weather");
      const tipEl = document.getElementById("weatherTip");

      locationEl.textContent = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
      weatherEl.textContent = "Weather data coming next step 🌦";
      tipEl.textContent = "Events will load here soon 🎉";

      btn.textContent = "Location Found ✅";
    },
    () => {
      alert("Unable to retrieve your location");
      btn.textContent = "Find Events Near Me";
    }
  );
});
