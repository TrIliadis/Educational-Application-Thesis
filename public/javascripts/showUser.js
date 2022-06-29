let counter = document.querySelectorAll(".button").length;
mapboxgl.accessToken = mapboxToken;

for (let i = 0; i < counter; i++) {
  let modal = document.getElementById(`myModal${i}`);
  let btn = document.getElementById(`modalBtn${i}`);
  let span = document.getElementsByClassName("close");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span[i].onclick = function () {
    modal.style.display = "none";
  };
}

const map = new mapboxgl.Map({
  style: "mapbox://styles/daxaka/cl4xrx2rv004c14ogai4imudy",
  center:
    geo.length === 2
      ? [geo[0], geo[1]]
      : [22.957511519708305, 40.6333009771503],
  zoom: 12,
  pitch: 45,
  bearing: -10,
  container: "map",
  antialias: true,
});

const marker = new mapboxgl.Marker({
  color: "orange",
  draggable: true,
}) // initialize a new marker
  .setLngLat(
    geo.length === 2 ? [geo[0], geo[1]] : [22.957511519708305, 40.6333009771503]
  ) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map
