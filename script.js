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

      // Temporary placeholders (next steps will replace these)
      weatherSection.classList.remove("hidden");
      eventsSection.classList.remove("hidden");

      document.getElementById("location").textContent =
        `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;

      document.getElementById("weather").textContent =
        "Weather data coming next step 🌦";

      document.getElementById("weatherTip").textContent =
        "Events will load here soon 🎉";

      btn.textContent = "Location Found ✅";
    },
    () => {
      alert("Unable to retrieve your location");
      btn.textContent = "Find Events Near Me";
    }
  );
});
