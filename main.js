// initialize Google maps
let map;
function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    // the coordinates centre over London, UK
    center: {lat: 51.509865, lng: -0.118092},
    zoom: 3,
    mapTypeId: 'hybrid'
  });

  // create a script element linking to the earthquake GeoJSON data
  let script = document.createElement('script');
  script.src = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
  // attach the script tag to the header
  document.getElementsByTagName('head')[0].appendChild(script);

  // set the marker styling
  map.data.setStyle(function(feature) {
      const magnitude = feature.getProperty('mag');
      return {
          icon: getCircle(magnitude)
      };
  });
}

// function to create the circle styling based on magnitude
function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5
    };
}

// place the resulting data onto the map
function eqfeed_callback(results) {
    map.data.addGeoJson(results);
}
