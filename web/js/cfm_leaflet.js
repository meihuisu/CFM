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

// ersi 
  var ersi_topographic = L.esri.basemapLayer("Topographic");
  var ersi_imagery = L.esri.basemapLayer("Imagery");
  var ersi_ng = L.esri.basemapLayer("NationalGeographic");

// otm topo
  var topoURL='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  var topoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors,<a href=http://viewfinderpanoramas.org"> SRTM</a> | &copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a>(CC-BY-SA)';
 L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution})

  var otm_topographic = L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution});

// osm street 
  var openURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 
  var openAttribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  var osm_street=L.tileLayer(openURL, {attribution: openAttribution});

  var baseLayers = {
    "ersi topo" : ersi_topographic,
    "ersi imagery" : ersi_imagery,
    "ersi NG" : ersi_ng,
    "otm topo": otm_topographic,
    "osm street" : osm_street
  };
  var overLayer = {};

  var basemap = L.layerGroup();

  var mymap = L.map('CFM_plot', {layers: [ersi_topographic, basemap]}).setView([34.3, -118.4], 7);

  L.control.layers(baseLayers, overLayer).addTo(mymap);

  L.control.scale({metric: 'false', imperial:'false', position: 'bottomleft'}).addTo(mymap);  

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

