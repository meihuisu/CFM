// This is leaflet specific utilities

var geoLayerPtr;
// global trace features in JSON
var cfmTraceList={"type":"FeatureCollection", "features":[]};

function resetTraces() {
  cfmTraceList={"type":"FeatureCollection", "features":[]};
}

function printTraces() {
  var cnt= cfmTraceList.features.length;
  window.console.log("number of traces..",cnt);
  var str=JSON.stringify(cfmTraceList);
  window.console.log(str);
}

function addGeoJSONAsFeature(geoJSON, gid, propdata) {
  if( typeof geoJSON === 'object') {
     blob= geoJSON;
     } else {
       blob=JSON.parse(geoJSON);
  }
  var tmp= { "id":gid,
             "type":"Feature", 
             "properties": { "popupContent": propdata['content'],
                             "style": { 
                                 "color": propdata['color'],
                                 "weight":2,
                                 "opacity":1
                            }},
             "geometry": blob 
          };

  cfmTraceList.features.push(tmp);
}
function remove_geo_layer(layer)
{
   viewermap.removeLayer(layer);
}

function load_geo()
{
//  printTraces();
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

 var topoURL='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
 var topoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors, &copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a>(CC-BY-SA)';
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

function addGeo(cfmTrace, mymap) {

   var geoLayer=L.geoJSON(cfmTrace, {
     filter: function (feature, layer) {
            if (feature.properties) {
                var tmp=feature.properties.show_on_map != undefined ? !feature.properties.show_on_map : true;
                return feature.properties.show_on_map != undefined ? !feature.properties.show_on_map : true;
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

