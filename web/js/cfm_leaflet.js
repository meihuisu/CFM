// This is leaflet specific utilities

function refresh_map()
{
  if (viewermap == undefined) {
    viewermap = L.map('CFM_plot').setView([34.3, -118.4], 7);
    } else {
      viewermap.setView([34.3, -118.4], 7);
  }
}

function setup_viewer()
{
 var mymap = L.map('CFM_plot').setView([34.3, -118.4], 7);

 var topoURL='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
 var topoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors,<a href=http://viewfinderpanoramas.org"> SRTM</a> | &copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a>(CC-BY-SA)';
 L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution}).addTo(mymap);

/*
 var openURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 
 var openAttribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
 L.tileLayer(openURL, {attribution: openAttribution}).addTo(mymap);
*/

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

function addGeoToMap(cfmTrace, mymap) {

   var geoLayer=L.geoJSON(cfmTrace, {
     filter: function (feature, layer) {
            if (feature.properties) {
                var tmp=feature.properties.show_on_map != undefined ? !feature.properties.show_on_map : true;
                return tmp;
            }
            return false;
     },
     style: function(feature) {
        var tmp=feature.properties.style;
        if(feature.properties.style != undefined) {
            return feature.properties.style;
        } else {
            return {color: "#0000ff", "weight":2}
        }
     },
     onEachFeature: onEachFeature
   }).addTo(mymap);

   var layerPopup;
   geoLayer.on('mouseover', function(e){
/* not used..
    // array of array
    var coordinates = e.layer.feature.geometry.coordinates;
    // pick the middle one
    var s=Math.floor((coordinates.length)/2);
    var tmp_coords=coordinates[s][0];
    var swapped_coordinates = [tmp_coords[1], tmp_coords[0]];  //Swap Lat and Lng
*/
    if (mymap) {
       var tmp=e.layer.feature.properties;
       var level1=tmp.popupLevel1Content;
       layerPopup = L.popup()
           .setLatLng(e.latlng) 
 //          .setContent('layer#'+e.layer.feature.id+'<br>'+level1) 
           .setContent(level1) 
           .openOn(mymap);
    }
  });
/*** XXX
  geoLayer.on('mouseout', function (e) {
    if (layerPopup && mymap) {
        mymap.closePopup(layerPopup);
        layerPopup = null;
    }
  });
***/

  return geoLayer;
}


function onEachFeature(feature, layer) {
//    var popupContent = "<p>I started out as a GeoJSON " +
//        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    var popupContent="";

    if (feature.properties != undefined  && feature.properties.popupContent != undefined ) {
      popupContent += feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
}

