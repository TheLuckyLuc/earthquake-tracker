const buttons = document.querySelectorAll('button');

// initialize Google maps
let map;
function initMap(option) {
    // create a global info window for when you click on the markers
    let infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.querySelector('#map'), {
        // the coordinates centre over London, UK
        center: {lat: 51.509865, lng: -0.118092},
        zoom: 3,
        mapTypeId: 'hybrid'
    });

    // load the JSON earthquake data onto the map
    map.data.loadGeoJson(option);

    // set the marker styling
    map.data.setStyle(function(feature) {
        const magnitude = feature.getProperty('mag');
        return {
            icon: getCircle(magnitude)
        };
    });

    // add a click event listener to all the markers
    map.data.addListener('click', function(event) {

        // set variables that contain location, magnitude & time data
        const location = event.feature.l.place;
        const magnitude = event.feature.l.mag;
        const time = new Date(event.feature.l.time);

        // set the content of the info window to be the location, time and magnitude of the clicked marker
        infowindow.setContent(`<strong>Location:</strong> ${location} || <strong>Time:</strong> ${time} || <strong>Magnitude:</strong> ${magnitude}`);
        // place it by the latitude & longitude of the marker
        infowindow.setPosition(event.latLng);
        infowindow.setOptions({pixelOffset: new google.maps.Size(0,-34)});
        infowindow.open(map);
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

// set options for different timescales
const options = {
    hour: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
    day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
    month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
}

// add a click event listener to each button
for (const button of buttons) {
    button.addEventListener('click', function() {
        // once clicked, initialize the map passing in the matching timescale link as an argument
        initMap(options[this.name]);
    });
}
