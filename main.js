let map;
function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: {lat: 51.509865, lng: -0.118092},
    zoom: 3,
    mapTypeId: 'hybrid'
  });
}
