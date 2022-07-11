mapboxgl.accessToken = mapboxToken;


const map = new mapboxgl.Map({
  style: "mapbox://styles/daxaka/cl4xrx2rv004c14ogai4imudy",
  center: [23.851731602423463, 38.56610933310402],
  zoom: 5,
  pitch: 45,
  bearing: -10,
  container: "map",
  antialias: true,
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

map.addControl(geocoder, "top-left");

map.on("load", () => {
  // Add a new source from our GeoJSON data and
  // set the 'cluster' option to true. GL-JS will
  // add the point_count property to your source data.
  map.addSource("usersLocation", {
    type: "geojson",
    // Point to GeoJSON data. This example visualizes all M1.0+ usersLocation
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    data: allUsers,
    cluster: true,
    clusterMaxZoom: 20, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "usersLocation",
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#F1C40F",
        15,
        "#D68910",
        30,
        "#BA4A00 ",
      ],
      "circle-radius": ["step", ["get", "point_count"], 15, 15, 20, 30, 25],
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "usersLocation",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  map.loadImage(
    "https://res.cloudinary.com/dgzlym20q/image/upload/v1656505267/makeItGreen/3135810_vqpxfo.png",
    (error, image) => {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage("student", image);

      // Add a data source containing one point feature.
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-77.4144, 25.0759],
              },
            },
          ],
        },
      });

      // Add a layer to use the image to represent the data.
      map.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "usersLocation", // reference the data source
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": "student", // reference the image
          "icon-size": 0.1,
        },
      });
    }
  );

  // inspect a cluster on click
  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    const clusterId = features[0].properties.cluster_id;
    map
      .getSource("usersLocation")
      .getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.
  map.on("click", "unclustered-point", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const popUp = e.features[0].properties.popUpMarkup;
  
    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(popUp).addTo(map);
  });

  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });
});
