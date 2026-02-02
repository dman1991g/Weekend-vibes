const btn = document.getElementById("getLocationBtn");
const locationEl = document.getElementById("location");
const weatherSection = document.getElementById("weatherSection");

btn.addEventListener("click", () => {
  alert("Button clicked ✔");

  if (!navigator.geolocation) {
    alert("Geolocation NOT supported");
    return;
  }

  alert("Requesting location…");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      alert("SUCCESS callback fired ✔");

      console.log("Raw position object:", position);

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      alert(`Coords received:\nLat: ${lat}\nLon: ${lon}`);

      console.log("Latitude:", lat);
      console.log("Longitude:", lon);

      if (!locationEl) {
        alert("❌ location element is NULL");
        return;
      }

      alert("location element FOUND ✔");

      locationEl.textContent =
        `DEBUG → Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;

      weatherSection.classList.remove("hidden");

      alert("Text written to screen ✔");
    },
    (error) => {
      alert(`ERROR callback fired ❌\nCode: ${error.code}\n${error.message}`);
      console.error("Geolocation error:", error);
    }
  );
});
