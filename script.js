const btn=document.getElementById("findEventsBtn");
const weatherSection=document.getElementById("weatherSection");
const eventSection=document.getElementById("eventSection");

btn.addEventListener("click",()=>{
  if(!navigator.geolocation){
    alert("Geolocation is not supported by your browser");
    return;
  }

  btn.textContent="Getting your location...";

  navigator.geolocation.getCurrentPosition(
    (position)=>{
      const lat=position.coords.latitude;
      const lon=position.coords.longitude;
      console.log("latitude",lat);
      console.log("longitude",lon);


      weatherSection.classList.remove("hidden");
      eventsSection.classList.remove("hidden");

      document.getElementById("location").textContent=
        'lat:${lat.toFixed(2)},Lon:${lon.toFixed(2)}';

      document.getElementById("weather").textContent=
        "weather data is coming in next step";

      document.getElementById("weatherTip").textContent=
        "Events will load here soon";

      btn.textContent="location Found";
    },
    ()=>{
      alert("unable to retrieve your location");
      btn.textContent="Find Events Near Me";
    }
  );
});
      
