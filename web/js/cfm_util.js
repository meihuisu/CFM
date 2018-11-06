/***
   cfm_util.js

***/

/***
   tracking data structure
***/
// [ { "region_id": region1_gid, "name" : name1 }, {"region_id": region2_gid, "name": name2 }, ... ]
var cfm_region_list=[];

// { gid1, gid2, ... }
var cfm_gid_list=[];

// { gid1, gid2, ... }, object without geoJSON info
var cfm_skip_gid_list=[];

//  [ { "gid": gid1,  "meta": mmm1 }, {  "gid": gid2, "meta": mmm2 }, ... } 
var cfm_fault_list=[];

// gid ==> gid from object_tb
// [ {"gid": gid1, "trace": trace1 }, {"gid":gid2, "trace":trace2}... ]
var cfm_trace_list=[];

// [ {"gid": gid1, "layer": layer1 }, {"gid":gid2, "layer":layer2}...]
var cfm_layer_list=[];

// tracking original style
// [ {"gid": gid1, "style": style1, "visibility": vis1, "highlight": hl1 },
//   {"gid":gid2, "style":style2, "visibility": vis2, "highlight": hl2}...]
var cfm_style_list=[];

/***
   styling data structure 
***/
// [ { "keyword" : key1, "color": color1 }, { "keyword" : key2, "color": color1 }, ...]
var plot_style_list;
var plot_style_list_default;

// strike range is from 5 to 359
var strike_range_min = 5;
var strike_range_max = 359;

function plotAll() {
//  load_geo_list_layer();
  load_trace_list();
  skip_gid_list();
}

function refreshAll() {
  document.getElementById("geoSearchByObjGidResult").innerHTML = "";
  document.getElementById("regionList").innerHTML = "";
  document.getElementById("strikeRange").innerHTML = "";
  document.getElementById("searchResult").innerHTML = "";
  document.getElementById("phpResponseText").innerHTML = "";
  document.getElementById("keywordTxt").value = '';
  document.getElementById("faultNameTxt").value = '';
  document.getElementById("latTxt").value = '';
  document.getElementById("lonTxt").value = '';
//  document.getElementById("objGidTxt").value = '';
  $("#regionBtn").attr("disabled", false);
  $("#regionBtn").show();  
  $("#rangeBtn").attr("disabled", false);
  $("#rangeBtn").show();  
/* multi-faults layer
  reset_geo_list_layer();
*/
  reset_geo_plot();
  refresh_map();
}

function getContentFromMeta(meta) {
// get info on this..
    var content="name: "+meta['name'];
    var strike=meta['strike'];
    if(strike != "") {
       content = content + "<br>" + "strike: "+strike;
       } else {
         content = content + "<br>" + "strike: "+NA;
    }
    return content;
}

function getGidFromMeta(meta) {
   var gid=meta['gid'];
   return gid;
}

function getColorFromMeta(meta) {
    var strike=meta['strike'];
    var color="black";
    if(strike != "") {
        v=parseInt(strike);
        v=(v-strike_range_min)/(strike_range_max-strike_range_min);
        blue = Math.round(255 * v);
        green = 0;
        red = Math.round((1-v)*255);
        color="RGB(" + red + "," + green + "," + blue + ")";
     } 
     return color;
}

// extract meta data blob from php backend, extract object_tb's gid and 
// use that to grab the matching geoJson
function getQueryMeta(namedList) {
    var str="";
    if (namedList == 'metaByFaultName') {
        str = $('[data-side="metaByFaultName"]').data('params');
    }
    if (namedList == 'metaByLatLon') {
        str = $('[data-side="metaByLatLon"]').data('params');
    }
    if (namedList == 'metaByKeyword') {
        str = $('[data-side="metaByKeyword"]').data('params');
    }
    if (namedList == 'metaByRegion') {
        str = $('[data-side="metaByRegion"]').data('params');
    }
    if (namedList == 'metaByStrikeRange') {
        str = $('[data-side="metaByStrikeRange"]').data('params');
    }

    var sz=(Object.keys(str).length);
    window.console.log("Number of meta blobs received from backend ->",sz);
    // iterate through the list and grab the geo info and update leaflet feature
    // structure one by one
    for( var i=0; i< sz; i++) {
       var meta = JSON.parse(str[i]);
       var gidstr=meta['gid'];
       var gid=parseInt(gidstr);
       cfm_fault_list.push({"gid":gid, "meta": meta });
       getGeoJSONbyObjGid(gidstr,meta);
    }
    return str;
}

function gotAllGeoJSON() {
  if (cfm_fault_list.length == (cfm_gid_list.length+cfm_skip_gid_list.length))
    return 1;
  return 0;
}

// extract the geo json blob from the backend php
function getGeoJSON() {
    var alist = $('[data-side="geo-json"]').data('params');
    if(alist == undefined) {
      window.console.log("EROR -- geometry is empty");
      return "";
    }
    var str=alist[0];
    return str;
}

function getStrikeRangeMinMax() {
    str= $('[data-side="strike-range"]').data('params');
    rMin=parseInt(str.min);
    rMax=parseInt(str.max);
    return [rMin, rMax];
}

function setupSlider(min,max) {
  $( "#slider-strike-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    step: 0.001,
    values: [ min, max ],
    slide: function( event, ui ) {
      $( "#strike-range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
  });
  $( "#strike-range" ).val( $( "#slider-strike-range" ).slider( "values", 0 ) + " - " + $( "#slider-strike-range" ).slider( "values", 1 ) );

  $('#slider-strike-range').slider("option", "min", min);
  $('#slider-strike-range').slider("option", "max", max);
  $( "#strike-range" ).val( min + " - " + max );
}

function searchWithStrikeRange() {
  //grab the min and max from the slider..
  vals = $( "#slider-strike-range" ).slider("option", "values");
  searchByStrikeRange(vals[0],vals[1]);
}


/******************/

// use the region list from php backend, generate the form html
function makeRegionList() {
    var str = $('[data-side="regions"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select name=\"users\" onchange=\"searchByRegion(this.value)\"> <option value=\"\">  Click to select a Region</option>";

    var sz=(Object.keys(str).length);
    window.console.log("Number of regions received from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=s['gid'];
       var name=s['name'];
       html=html+"<option value=\"" + name + "\">"+ gid +"</option>";
    }
    return html;
}

function makeStrikeSlider()
{
    var html=" Strike range: <input type=\"text\" id=\"strike-range\" readonly style=\"border:0; color:orange; text-align:center;\"><button id=\"strikeBtn\" type=\"button\" title=\"search with strike range\" class=\"btn btn-default\" style=\"border:0; color:blue\" onclick=\"searchWithStrikeRange()\"><span class=\"glyphicon glyphicon-search\"></span></button></div><div id=\"slider-strike-range\"></div><br>";
    return html;
} 

function nullTableEntry(gid)
{
  var layerbtn="layer_"+gid+"_btn";
  var highlightbtn="highlight_"+gid+"_btn";
  document.getElementById(layerbtn).disabled = true; 
  document.getElementById(highlightbtn).disabled = true;
  document.getElementById(layerbtn).style.visibility = "hidden"; 
  document.getElementById(highlightbtn).style.visibility = "hidden"; 
}


function makeResultTable(str)
{
    var html="<table><tr><th></th><th>CFM5.2 Fault Object Name</th><th>Strike</th></tr>";
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=s['gid'];
       var name=s['name'];
       var strike=s['strike'];
       html=html+"<tr><td><button id=\"layer_"+gid+"_btn\" onclick=toggle_layer("+gid+");><span class=\"glyphicon glyphicon-eye-open\"></span></button><button id=\"highlight_"+gid+"_btn\" onclick=toggle_highlight("+gid+");><span class=\"glyphicon glyphicon-star-empty\"></span></button> </td><td>" + name + "</td> <td>" + strike + "</td></tr>";
    }
   html=html+ "</table>";
   return html;
}
