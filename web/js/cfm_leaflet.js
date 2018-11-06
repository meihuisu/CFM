// This is leaflet specific utilities

var highlight_style = {
    'color': 'RGB(0, 255, 255)',
    'weight': 3,
    'opacity': 1
};

/*********************************************************
 This is setup for global Layer consist of many 
 feautures(=faults) to be manipulated in sync
*********************************************************/
// geo_list_layer, global trace features in JSON
var cfmTraceList={"type":"FeatureCollection", "features":[]};
var geoLayerPtr;

function reset_geo_list_layer() {
  if(geoLayerPtr != undefined)
      viewermap.removeLayer(geoLayerPtr);
  cfmTraceList={"type":"FeatureCollection", "features":[]};
}

function print_geo_list_layer() {
  var cnt= cfmTraceList.features.length;
  window.console.log("number of traces..",cnt);
  var str=JSON.stringify(cfmTraceList);
  window.console.log(str);
}

// add a geoJSON to the global feature list 
function addGeoJSONAsFeatureToList(geoJSON, gid, meta) {
  if( typeof geoJSON === 'object') {
     blob= geoJSON;
     } else {
       blob=JSON.parse(geoJSON);
  }
  var content=getContentFromMeta(meta);
  var color=getColorFromMeta(meta);
  var tmp= { "id":gid,
             "type":"Feature", 
             "properties": { "popupContent": content,
                             "style": { 
                                 "color": color,
                                 "weight":3,
                                 "opacity":1
                            }},
             "geometry": blob 
          };

  cfmTraceList.features.push(tmp);
}

function load_geo_list_layer()
{
  geoLayerPtr=addGeoToMap(cfmTraceList, viewermap);
  return geoLayerPtr;
}
/*********************************************************/
function reset_geo_plot() {
  cfm_layer_list.forEach(function(element) {
      var l=element['layer'];
      viewermap.removeLayer(l);
  });
  cfm_gid_list=[];
  cfm_fault_list=[];
  cfm_trace_list=[];
  cfm_layer_list=[];
  cfm_region_list={};
  cfm_style_list=[];
}

// create a feature with just 1 geoJSON, per object_tb's gid
function makeGeoJSONFeature(geoJSON, gid, meta) {
  if(in_trace_list(gid)) {
    return;
  }
  if(geoJSON == undefined) {
    window.console.log("makeGeoJSONFeature, geoJSON is null for ", gid);
    cfm_skip_gid_list.push(gid);
    return;
  }
  if( typeof geoJSON === 'object') {
     blob= geoJSON;
     } else {
       blob=JSON.parse(geoJSON);
  }

  var content=getContentFromMeta(meta);
  var color=getColorFromMeta(meta);
  var style= { "weight":3,
               "opacity":1,
               "color": color
              };

  var tmp= { "id":gid,
             "type":"Feature", 
             "properties": { "popupContent": content,
                             "style": style
                           },
             "geometry": blob 
          };

  var cfmTrace={"type":"FeatureCollection", "features":[]};
  cfmTrace.features.push(tmp);
  
  cfm_trace_list.push({"gid":gid, "trace":cfmTrace});
  cfm_gid_list.push(gid);
  cfm_style_list.push({"gid":gid, "style":style, "visibility": 0, "highlight":0});
}

/* return true if target is in the trace list */
function in_trace_list(target) {
   var found=0;
   cfm_gid_list.forEach(function(element) {
          if (element == target)
             found=1;
   });
   return found;
}

function find_layer_list(target) { 
   var found=undefined;
   cfm_layer_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=element;
   });
   return found;
}

function find_style_list(target) { 
   var found=undefined;
   cfm_style_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=element;
   });
   return found;
}

function toggle_highlight(target) {
   var s=find_style_list(target);
   var h=s['highlight'];

   if(h==0) {
     s['highlight']=1;
     highlight_layer(target);
     } else {
       s['highlight']=0;
       unhighlight_layer(target);
   }
}

function highlight_layer(target) {
   var l=find_layer_list(target);
   var id=get_leaflet_id(l) 
   viewermap._layers[id].setStyle(highlight_style);
}

// reset to original style
function unhighlight_layer(target) {
   var l=find_layer_list(target);
   var id=get_leaflet_id(l) 
   var o= find_style_list(target);
   var original=o['style'];
   if(original!=undefined)
      viewermap._layers[id].setStyle(original);
}

function get_leaflet_id(layer) {
   var id=layer['layer']._leaflet_id;
   return id;
}

function find_trace_list(target) { 
   var found=undefined;
   cfm_trace_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=element;
   });
   return found;
}

function load_trace_list()
{
  var sz=cfm_trace_list.length;
  for (var i=0; i<sz; i++) {
     var c=cfm_trace_list[i];
     var gid=c['gid'];
     var trace =c['trace'];
     // if it is there already, don't add
     var t=find_layer_list(gid);
     if(t) {
        window.console.log("already plotted this layer", gid);
        continue;
     }
     var layer=addGeoToMap(trace, viewermap);
     cfm_layer_list.push({"gid":gid, "layer":layer}); 
     var s =find_style_list(gid);
     s['visibility']=1; // turn it on
  }
  window.console.log("load_layer_list...",sz);
}

// suppress the buttons for object that has no geoJSON
function skip_gid_list() {
  var sz=cfm_skip_gid_list.length;
  for (var i=0; i<sz; i++) {
     var gid=cfm_skip_gid_list[i];
     nullTableEntry(gid);
  }
}

function toggle_layer(target)
{
  var c=find_layer_list(target);
  var s=find_style_list(target);
  var t=find_trace_list(target);
  var layer=c['layer'];
  var vis=s['visibility'];
  if(vis == 1) {
    viewermap.removeLayer(layer);
    s['visibility'] = 0;
    } else {
      s['visibility'] = 1;
      viewermap.addLayer(layer);
  }
}
/*********************************************************/

function refresh_map()
{
//      viewermap.setView([37, -119], 6);
  if (viewermap == undefined) {
    viewermap = L.map('CFM_plot').setView([34, -117], 6);
    } else {
      viewermap.setView([34, -117], 6);
  }
}

function setup_viewer()
{
 var mymap = L.map('CFM_plot').setView([34, -118], 6);

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

function addGeoToMap(cfmTrace, mymap) {

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

