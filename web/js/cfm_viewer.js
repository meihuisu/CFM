var geoLayerPtr;

function remove_geo_layer(layer)
{
   viewermap.removeLayer(layer);
}

function load_geo()
{
  printTraces();
  geoLayerPtr=addGeo(cfmTraceList, viewermap);
}

function refresh_map()
{
  if (viewermap == undefined) {
    viewermap = L.map('CFM_plot').setView([37, -119], 6);
    } else {
      viewermap.setView([37, -119], 6);
  }
}

function setup_viewer()
{
 var mymap = L.map('CFM_plot').setView([37, -119], 6);

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
 {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);


/*
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);
*/

/**** sample markers on leaflet viewer
  L.marker([38, -119]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.");

  L.circle([43, -120], 20000, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(mymap).bindPopup("I am a circle.");

  L.polygon([
    [42.509, -120.5],
    [42, -121],
    [43, -121.5]
  ]).addTo(mymap).bindPopup("I am a polygon.");

****/

  var popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
  }

  mymap.on('click', onMapClick);
  return mymap;
}

function addGeo(cfmTrace, mymap) {

   var geoLayer=L.geoJSON(cfmTrace, {
     filter: function (feature, layer) {
            if (feature.properties) {
                return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
            }
            return false;
     },
     onEachFeature: onEachFeature
   }).addTo(mymap);

   return geoLayer;
}


function onEachFeature(feature, layer) {
//    var popupContent = "<p>I started out as a GeoJSON " +
//        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    var popupContent ="";
    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
}

