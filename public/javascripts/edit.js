const email = document.getElementById("email");
const imgInput = document.getElementById("imgInput");
const profileImg = document.getElementById("profileImg");
let counter = document.querySelectorAll(".slider").length;
const container = document.getElementById("inputContainer");
const btnContainer = document.getElementById("btnContainer");

let markers = [];
mapboxgl.accessToken = mapboxToken;

imgInput.onchange = () => {
  const [file] = imgInput.files;
  if (file) {
    profileImg.src = URL.createObjectURL(file);
  }
};

const addSkill = () => {
  counter++;
  const p = document.createElement("p");
  p.classList.add("white", "mt-3");
  p.id = `p${counter - 1}`;
  container.append(p);

  const nameInput = document.createElement("input");
  nameInput.placeholder = "Τίτλος...";
  nameInput.classList.add("mt-5", "inputSkills");
  nameInput.name = `skills[${counter - 1}]`;
  p.append(nameInput);
  const span = document.createElement("span");
  span.classList.add("sliderRange");
  span.id = `demo${counter - 1}`;
  span.innerText = 50;
  p.append(span);
  const div = document.createElement("div");
  div.classList.add("slidercontainer");
  div.id = `slider${counter - 1}`;
  container.append(div);
  const ratingInput = document.createElement("input");
  ratingInput.classList.add("slider");
  ratingInput.name = `skills[${counter - 1}]`;
  ratingInput.type = "range";
  ratingInput.min = "1";
  ratingInput.max = "100";
  ratingInput.value = "50";
  ratingInput.id = `myRange${counter - 1}`;
  div.append(ratingInput);

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("mt-4", "me-3", "btn", "btn-danger");
  cancelBtn.innerText = "Άκυρο";
  cancelBtn.type = "button";
  cancelBtn.onclick = () => {
    const removeP = document.getElementById(`p${counter - 1}`);
    const removeSlider = document.getElementById(`slider${counter - 1}`);
    container.removeChild(removeP);
    container.removeChild(removeSlider);
    btnContainer.removeChild(cancelBtn);
    counter--;
  };
  btnContainer.prepend(cancelBtn);
};

container.addEventListener("input", function (e) {
  for (let i = 0; i < counter; i++) {
    if (e.target.classList.contains("slider")) {
      const id = e.target.id.match(/\d+/)[0];
      const span = document.getElementById(`demo${id}`);
      span.innerText = e.target.value;
    }
  }
});

email.onchange = () => {
  if (!ValidateEmail(email.value)) {
    invalidEmail.classList.add("d-block");
  } else invalidEmail.classList.remove("d-block");
};

function ValidateEmail(input) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) return true;
  else return false;
}

const map = new mapboxgl.Map({
  style: "mapbox://styles/daxaka/cl4xrx2rv004c14ogai4imudy",
  center:
    geo.length === 2
      ? [geo[0], geo[1]]
      : [22.957511519708305, 40.6333009771503],
  zoom: 17,
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

markers.push(marker);

marker.on("dragend", function (e) {
  const lngLat = e.target.getLngLat();

  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat["lng"]}, ${lngLat["lat"]}.json?limit=1&proximity=ip&types=place%2Caddress%2Cpostcode%2Cregion&language=el&access_token=pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw`;

  fetch(url)
    .then((data) => data.json())
    .then((data) => (address.value = data.features[0].place_name));
});

map.on("load", () => {
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
  ).id;

  // The 'building' layer in the Mapbox Streets
  // vector tileset contains building height data
  // from OpenStreetMap.
  map.addLayer(
    {
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    },
    labelLayerId
  );
});

map.addControl(new mapboxgl.NavigationControl());

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  marker: false,
  limit: 6,
  country: "gr, cy",
  language: "el, en",
  mapboxgl: mapboxgl,
});

geocoder.on("result", (e) => {
  marker.remove();
  address.value = e.result.place_name_el;
  const marker1 = new mapboxgl.Marker({
    color: "orange",
    draggable: true,
  })
    .setLngLat(e.result.center)
    .addTo(map);
  markers.push(marker1);
  marker1.on("dragend", function (e) {
    const lngLat = e.target.getLngLat();

    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat["lng"]}, ${lngLat["lat"]}.json?limit=1&proximity=ip&types=place%2Caddress%2Cpostcode%2Cregion&language=el&access_token=pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw`;

    fetch(url)
      .then((data) => data.json())
      .then((data) => (address.value = data.features[0].place_name));
  });
});

map.addControl(geocoder, "top-left");

map.on("style.load", function () {
  map.on("click", function (e) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].remove();
    }

    const coordinates = e.lngLat;

    marker2 = new mapboxgl.Marker({
      color: "orange",
      draggable: true,
    })
      .setLngLat(coordinates)
      .addTo(map);

    markers.push(marker2);

    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng}, ${coordinates.lat}.json?limit=1&proximity=ip&types=place%2Caddress%2Cpostcode%2Cregion&language=el&access_token=pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw`;

    fetch(url)
      .then((data) => data.json())
      .then((data) => (address.value = data.features[0].place_name));

    marker2.on("dragend", function (e) {
      const lngLat = e.target.getLngLat();

      let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat["lng"]}, ${lngLat["lat"]}.json?limit=1&proximity=ip&types=place%2Caddress%2Cpostcode%2Cregion&language=el&access_token=pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw`;

      fetch(url)
        .then((data) => data.json())
        .then((data) => (address.value = data.features[0].place_name));
    });
  });
});
