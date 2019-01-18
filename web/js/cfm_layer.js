/***
   cfm_layer.js
***/

var highlight_style = {
/*
    'color': 'RGB(0, 255, 255)',
*/
    'color': 'RGB(255, 0, 0)',
    'opacity':1,
    'weight': 2,
};

// for toggleAll option
var cfm_toggle_plot=1;

/***
   tracking data structure
***/
var use_fault_color = "default";
var use_download_set = "";

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_region_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_system_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_section_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_name_list=[];

// [{ gid, name, url, objgid}, {gid, name, url, objgid}, ... ] gid that is from native list
var cfm_native_list=[];

// gid is objgid
// {gid, gid, ...}
var cfm_native_gid_list=[];

// [{ gid, name, url, objgid}, {gid, name, url, objgid}, ... ], gid that is from 500m list
var cfm_500m_list=[];

// gid is objgid
// {gid, gid, ...}
var cfm_500m_gid_list=[];

// [{ gid, name, url, objgid }, {gid, name, url, objgid}, ... ], gid that is from 1000m list
var cfm_1000m_list=[];

// gid is objgid
// {gid, gid, ...}
var cfm_1000m_gid_list=[];

// gid is objgid
// { gid1, gid2, ... }, all objects 
var cfm_gid_list=[];

// gid is objgid
// { gid1, gid2, ... }, only without geo
var cfm_nogeo_gid_list=[];

// all objgid ==> gid from object_tb, all objects
//  [ { "gid": gid1,  "meta": mmm1 }, {  "gid": gid2, "meta": mmm2 }, ... } 
var cfm_fault_meta_list=[];

// gid is objgid, trace is leaflet feature (1 per layer)
// [ {"gid": gid1, "trace": trace1 }, {"gid":gid2, "trace":trace2}... ], only with geo
var cfm_trace_list=[];

// gid is objgid, layer is geoLayer made from geoJSON with trace-feature 
// by leaflet
// [ {"gid": gid1, "layer": layer1 }, {"gid":gid2, "layer":layer2}...], only with geo
var cfm_layer_list=[];

// tracking original style
// gid is objgid
// [ {"gid": gid1, "style": style1, "visible": vis1, "highlight": hl1 }...], only with geo
var cfm_style_list=[];

// gid is objgid
// { gid1, gid2, ... }, tracking current active search result, from all objects
var cfm_active_gid_list=[];
/*********************************************************
*********************************************************/

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
//    window.console.log("makeGeoJSONFeature, geoJSON is null for ", gid);
    return undefined;
  }
  if( typeof geoJSON === 'object') {
     blob= geoJSON;
     } else {
       blob=JSON.parse(geoJSON);
  }

  var level2content=getSecondaryContentFromMeta(meta);
  var level1content=getMainContentFromMeta(meta);
  var color=getColorFromMeta(meta);
  var style= { "weight":2,
               "opacity":0.8,
               "color": color
              };

  var tmp= { "id":gid,
             "type":"Feature", 
             "properties": { "popupContent": level2content,
                             "popupMainContent":level1content,
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

// reset to style with new color
// in both cfm_style_list and also in layer -- but only visible ones
function reset_fault_color() {
  // reset fault color in the style list
  var new_cfm_style_list=[];
  cfm_style_list.forEach(function(element) {
    var gid=element['gid'];
    var gmeta=find_meta_list(gid);
    var newcolor=getColorFromMeta(gmeta['meta']);
    var vis=element['visible'];
    var hl=element['highlight'];
    var newstyle= { "weight":2,
                    "opacity":0.8,
                    "color": newcolor
                  };
    new_cfm_style_list.push({"gid":gid, "style":newstyle, "visible": vis, "highlight":hl})
  });
  cfm_style_list=new_cfm_style_list;

  cfm_layer_list.forEach(function(element) {
    var gid=element['gid'];
    var gstyle=find_style_list(gid);
    var id=get_leaflet_id(element) 
    var style=gstyle['style'];
    var v=gstyle['visible'];
    var h=gstyle['highlight'];
    if(v) {
       if(!h) {
         viewermap._layers[id].setStyle(style);
       }
      } else {
      gstyle['dirty_style']=true;
    }
  });
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

function reset_download_set()
{
   use_download_set = "";
}

function get_meta_list(gidlist) {
   var mlist=[];
   gidlist.forEach(function(gid) {
     var m=find_meta_list(gid);
     mlist.push(m['meta']);
   });
   return mlist;
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
     if ( element == target )
        found=1;
   });
   return found;
}


// find a layer from the layer list
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
     if( s['highlight']==1 && s['visible']==1 ) {
       toggle_highlight(gid);
     }
   });
}

// select every layer
function select_layer_list() {
   cfm_layer_list.forEach(function(element) {
     var gid=element['gid'];
     var s=find_style_list(gid);
     if( s['highlight']==0 && s['visible']==1 ) {
       toggle_highlight(gid);
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

function get_highlight_list() {
   var hlist=[];
   cfm_style_list.forEach(function(element) {
     if( element['highlight']==1 ) {
       hlist.push(element['gid']);
     }
   });
   return hlist;
}


function toggle_highlight(target) {
   var s=find_style_list(target);
   var h=s['highlight'];
   var star='#'+"highlight_"+target;

   if(h==0) {
     $(star).removeClass('glyphicon-ok').addClass('glyphicon-ok-circle');
     s['highlight']=1;
     var l=find_layer_list(target);
     var id=get_leaflet_id(l) 
     viewermap._layers[id].setStyle(highlight_style);
     cfm_select_count++;
     // adjust width if needed
     $('#itemCount').html(cfm_select_count).css('display', 'block')
/* get actual rendored font/width
     var fs = $('#itemCount').html(cfm_select_count).css('font-size');
     var width = $('#itemCount').html(cfm_select_count).css('width');
*/
     if(cfm_select_count == 100)
        $('#itemCount').html(cfm_select_count).css("width","30px");
     } else {
       $(star).removeClass('glyphicon-ok-circle').addClass('glyphicon-ok');
       if(cfm_select_count == 99) // reset font size
         $('#itemCount').html(cfm_select_count).css("width","20px");
       cfm_select_count--;
       if(cfm_select_count == 0) {
         $('#itemCount').html(cfm_select_count).css('display', 'none')
         } else {
           $('#itemCount').html(cfm_select_count).css('display', 'block')
       }
       s['highlight']=0;
       var l=find_layer_list(target);
       var id=get_leaflet_id(l) 
       var s= find_style_list(target);
       var original=s['style'];
       var v=s['visible'];
       if(v && original!=undefined)
          viewermap._layers[id].setStyle(original);
   }
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

function in_500m_gid_list(target) {
   var found=0;
   cfm_500m_gid_list.forEach(function(element) {
          if (element == target) {
             found=1;
          }
   });
   return found;
}

function url_in_500m_list(target) {
   var url=null;
   cfm_500m_list.forEach(function(element) {
         if(element['objgid']==target) {
            url=element['url'];
         }
   });
   return url;
}

function in_1000m_gid_list(target) {
   var found=0;
   cfm_1000m_gid_list.forEach(function(element) {
          if (element == target) {
             found=1;
          }
   });
   return found;
}

function url_in_1000m_list(target) {
   var url=null;
   cfm_1000m_list.forEach(function(element) {
         if(element['objgid']==target) {
            url=element['url'];
         }
   });
   return url;
}

function in_native_gid_list(target) {
   var found=0;
   cfm_native_gid_list.forEach(function(element) {
          if (element == target)
             found=1;
   });
   return found;
}

function url_in_native_list(target) {
   var url=null;
   cfm_native_list.forEach(function(element) {
         if(element['objgid']==target) {
            url=element['url'];
         }
   });
   return url;
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
     if(vis == 0) { 
         toggle_layer(gid) 
     }
  }
}

// make every layer visible
function toggle_on_all_layer()
{
  var sz=cfm_style_list.length;
  if (sz==0) return;
  for (var i=0; i<sz; i++) {
     var s=cfm_style_list[i];
     var vis=s['visible'];
     var gid=s['gid'];
     if(vis == 0) { 
       toggle_layer(gid); 
          // mark only in active search list
       if(in_active_gid_list(gid)==1) { 
          s['dirty_visible']=true;
       }
     }
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
      if( s['dirty_visible'] != undefined ){ // do nothing
        s['dirty_visible'] = undefined;
        return;
      }
      s['visible'] = 1;
      $(eye).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
      viewermap.addLayer(layer);
// if style is dirty, needs to be updated from the stylelist..
      if( s['dirty_style'] !=  undefined ) {
        var id=get_leaflet_id(c);
        var style=s['style'];
        viewermap._layers[id].setStyle(style);
        s['dirty_style']=undefined;
      }
  }
}
