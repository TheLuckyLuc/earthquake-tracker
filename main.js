// initialize Google maps
let map;
function initMap() {
    map = new google.maps.Map(document.querySelector('#map'), {
        // the coordinates centre over London, UK
        center: {lat: 51.509865, lng: -0.118092},
        zoom: 3,
        mapTypeId: 'hybrid'
    });

    // load the JSON earthquake data onto the map
    map.data.loadGeoJson('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');

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
