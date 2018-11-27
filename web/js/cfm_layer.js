/***
   cfm_layer.js
***/

var highlight_style = {
    'color': 'RGB(0, 255, 255)',
    'weight': 3,
};

/***
 all trace Layer consist of many feautures(=faults) to be 
 manipulated in sync
***/
//var cfm_all_trace={"type":"FeatureCollection", "features":[]};
//var cfm_all_layer;




var cfm_toggle_plot=1;

/***
   tracking data structure
***/
// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_region_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_system_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_section_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_name_list=[];


// { gid1, gid2, ... }, all objects 
var cfm_gid_list=[];

// { gid1, gid2, ... }, only without geo
var cfm_nogeo_gid_list=[];

// all gid ==> gid from object_tb, all objects
//  [ { "gid": gid1,  "meta": mmm1 }, {  "gid": gid2, "meta": mmm2 }, ... } 
var cfm_fault_meta_list=[];

// [ {"gid": gid1, "trace": trace1 }, {"gid":gid2, "trace":trace2}... ], only with geo
var cfm_trace_list=[];

// [ {"gid": gid1, "layer": layer1 }, {"gid":gid2, "layer":layer2}...], only with geo
var cfm_layer_list=[];

// tracking original style
// [ {"gid": gid1, "style": style1, "visible": vis1, "highlight": hl1 }...], only with geo
var cfm_style_list=[];

// { gid1, gid2, ... }, tracking current active search result, from all objects
var cfm_active_gid_list=[];
/*********************************************************
*********************************************************/

//function reset_all_layer() {
//  if(cfm_all_layer != undefined)
//      viewermap.removeLayer(cfm_all_layer);
//  cfm_all_trace={"type":"FeatureCollection", "features":[]};
//}

//function print_all_trace() {
//  var cnt= cfm_all_trace.features.length;
//  window.console.log("number of traces..",cnt);
//  var str=JSON.stringify(cfm_all_trace);
//  window.console.log(str);
//}

// add a geoJSON to the global feature list 
//function addGeoJSONAsFeatureToAll(geoJSON, gid, meta) {
//  if( typeof geoJSON === 'object') {
//     blob= geoJSON;
//     } else {
//       blob=JSON.parse(geoJSON);
//  }
//  var content=getContentFromMeta(meta);
//  var tmp= { "id":gid,
//             "type":"Feature", 
//             "properties": { "popupContent": content,
//                             "style": { 
//                                 "color": "RGB(255,0,0)",
//                                 "weight":3,
//                                 "opacity":1
//                            }},
//             "geometry": blob 
//          };
//  cfm_all_trace.features.push(tmp);
//}

//function load_all_trace()
//{
//  cfm_all_layer=addGeoToMap(cfm_all_trace, viewermap);
//  return cfm_all_layer;
//}
/*********************************************************/
function reset_geo_plot() {
  // can not really 'destroy' layer and so need to reuse..
  cfm_active_gid_list=[];
  reset_layer_list();  // unhighlight the layers first
  // reset_style_list();
  // generate the result table according to the style_list..
  // remove all the layer
  // redraw the layers
  cfm_toggle_plot=0;
  toggleAll();
}

// create a feature with just 1 geoJSON, per object_tb's gid
function makeGeoJSONFeature(geoJSON, gid, meta) {
  if(in_trace_list(gid)) {
    return undefined;
  }

  if(geoJSON == undefined) {
    window.console.log("BAD BAD BAD, makeGeoJSONFeature, geoJSON is null for ", gid);
    return undefined;
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

  var a_trace={"type":"FeatureCollection", "features":[]};
  a_trace.features.push(tmp);
  cfm_trace_list.push({"gid":gid, "trace":a_trace});
  cfm_style_list.push({"gid":gid, "style":style, "visible": 0, "highlight":0});
  return a_trace;
}

/* return true if target is in the trace list */
function find_style_list(target) {
   var found=0;
   cfm_style_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=element;
   });
   return found;
}

function reset_style_list() {
   cfm_style_list.forEach(function(element) {
     element['visible ']=1;
     element['highlight']=0;
   });
}

function remove_layer_list() {
  cfm_layer_list.forEach(function(element) {
      var l=element['layer'];
      viewermap.removeLayer(l);
  });
}

/* return true if target is in the meta list */
function find_meta_list(target) {
   var found=0;
   cfm_fault_meta_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=element;
   });
   return found;
}

/* return true if target is in the trace list */
function in_trace_list(target) {
   var found=0;
   cfm_trace_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=1;
   });
   return found;
}

/* return true if target is in the trace list */
function in_active_gid_list(target) {
   var found=0;

   if(cfm_active_gid_list.length == 0)
     return found;

   cfm_active_gid_list.forEach(function(element) {
     if ( element['gid'] == target )
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

// just in case the layer's color got set to highlight
function reset_layer_list() { 
   cfm_layer_list.forEach(function(element) {
     var gid=element['gid'];
     var s=find_style_list(gid);
     if( s['highlight']==1 ) {
       unhighlight_layer(gid);
     }
   });
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
   var  star='#'+"highlight_"+target;

   if(h==0) {
     $(star).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
     s['highlight']=1;
     highlight_layer(target);
     } else {
       $(star).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
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
   var v=o['visible'];
   if(v && original!=undefined)
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

function load_a_trace(gid,trace) {
  var t=find_layer_list(gid);
  if(t) {
    window.console.log("already plotted this layer", gid);
    return;
  }
  var layer=addGeoToMap(trace, viewermap);
  cfm_layer_list.push({"gid":gid, "layer":layer}); 
  var s =find_style_list(gid);
  if( s == undefined ) {
     window.console.log("BAD!! load_a_trace..", gid);
     return;
  }
  s['visible']=1; // turn it on
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
     s['visible']=1; // turn it on
  }
  window.console.log("load_layer_list...",sz);
}

function in_nogeo_gid_list(target) {
   var found=0;
   cfm_nogeo_gid_list.forEach(function(element) {
          if (element == target)
             found=1;
   });
   return found;
}

// toggle off everything except if there
// is a set of search result..
function toggle_off_all_layer()
{
  var sz=cfm_style_list.length;
  if (sz==0) return;
  for (var i=0; i<sz; i++) {
     var s=cfm_style_list[i];
     var vis=s['visible'];
     var gid=s['gid'];
     if(vis == 1) { 
       toggle_layer(gid) 
     }
  }
  cfm_toggle_plot=0;
}

function toggle_layer_with_list(glist)
{
  var sz=glist.length;
  if (sz==0) return;
  for (var i=0; i<sz; i++) {
     var gid=glist[i];
     var s=find_style_list(gid);
     if(s == undefined)
        continue;
     var vis=s['visible'];
     var gid=s['gid'];
     if(vis == 0) 
       toggle_layer(gid) 
  }
}

function toggle_on_all_layer()
{
  var sz=cfm_style_list.length;
  if (sz==0) return;
  for (var i=0; i<sz; i++) {
     var s=cfm_style_list[i];
     var vis=s['visible'];
     var gid=s['gid'];
     if(vis == 0) 
       toggle_layer(gid) 
  }
}

function toggle_layer(target)
{
  var c=find_layer_list(target);
  var s=find_style_list(target);
  var t=find_trace_list(target);
  var layer=c['layer'];
  var vis=s['visible'];
  var eye='#'+"toggle_"+target;
  if(vis == 1) {
    $(eye).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
    viewermap.removeLayer(layer);
    s['visible'] = 0;
    } else {
      s['visible'] = 1;
      $(eye).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
      viewermap.addLayer(layer);
  }
}

//  do some popup and options 
function download_layer(target) {
   window.console.log("download_layer: not implmented yet..");
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

/*** XXX
   var layerPopup;
   geoLayer.on('mouseover', function(e){
    var coordinates = e.layer.feature.geometry.coordinates;
    var swapped_coordinates = [coordinates[1], coordinates[0]];  //Swap Lat and Lng
    if (mymap) {
       layerPopup = L.popup()
           .setLatLng(swapped_coordinates)
           .setContent('NEW Popup for feature #'+e.layer.feature.properties.id)
           .openOn(mymap);
    }
  });
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

