// This is leaflet specific utilities

function clear_popup()
{
  viewermap.closePopup();
}

function refresh_map()
{
  if (viewermap == undefined) {
    window.console.log("refresh_map: BAD BAD BAD");
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
    "ersi NG" : ersi_ng,
    "ersi imagery" : ersi_imagery,
    "otm topo": otm_topographic,
    "osm street" : osm_street
  };
  var overLayer = {};
  var basemap = L.layerGroup();

// ==> mymap <==
  var mymap = L.map('CFM_plot', {layers: [ersi_topographic, basemap], zoomControl:false}).setView([34.3, -118.4], 7);

// basemap selection
  var ctrl_div=document.getElementById('external_leaflet_control');

var layerControl = L.control.layers(baseLayers, overLayer,{collapsed: true });
layerControl.addTo(mymap);
layerControl._container.remove();
ctrl_div.appendChild(layerControl.onAdd(mymap));

//  L.control.layers(baseLayers, overLayer).addTo(mymap);


// scalebar
  L.control.scale({metric: 'false', imperial:'false', position: 'bottomleft'}).addTo(mymap);  

/*
  var external_leaflet_control = L.control();
  external_leaflet_control.onAdd= function (map) {
       this._div=document.getElementById('external_leaflet_control');
       this.update();
       return this._div;
  }

  external_leaflet_control.update = function (props) {
       this._div.innerHTML = '&lt;h4&gt;US Population Density&lt;/h4&gt;';
  };
*/

/*
 watermark XXX
  L.Control.Watermark = L.control.extend({
    onAdd: function (map) {
      var img=L.DomUtil.create('img');
      img.src = './css/images/logo.png';
      img.stuyle.width ='200px';
      return img;
    },
    onRemove: function(map) {
       // no-op
    }
  });
  L.control.watermark= function(opts) {
     return new L.Control.Watermark(opts);
  }
*/

// mouse location popup 
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
// leaflet-popup-close-button -- location
    if (mymap) {
       var tmp=e.layer.feature.properties;
       var level1=tmp.popupLevel1Content;
       layerPopup = L.popup()
           .setLatLng(e.latlng) 
//           .setContent('layer#'+e.layer.feature.id+'<br>'+level1) 
           .setContent(level1) 
           .openOn(mymap);
    }
  });
/*** XXX
  geoLayer.on('mouseout', function (e) {
    window.console.log("moues out..layer#"+e.layer.feature.id) 
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

