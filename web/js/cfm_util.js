

/***
   cfm_util.js

***/

/***
   tracking data structure
***/
// { "region1": region1_gid, "region2": region2_gid, ... }
var cfm_region_list;
// { gid1, gid2, ... }
var cfm_gid_list;
//  [ { "meta": mmm1 }, { "meta": mmm2 }, ... } 
var cfm_fault_list;


/***
   styling data structure 
***/
// [ { "keyword" : key1, "color": color1 }, { "keyword" : key2, "color": color1 }, ...]
var plot_style_list;
var plot_style_list_default;

// reset tracking data
function resetTrackingData() {
    cfm_gid_list={};
    cfm_fault_list=[];
    cfm_region_list={};
}

function setStyleData() {
   // read json blob..
}

function plotAll() {
  load_geo();
}

function refreshAll() {
  document.getElementById("geoSearchByObjGidResult").innerHTML = "";
  document.getElementById("regionList").innerHTML = "";
  document.getElementById("strikeRange").innerHTML = "";
  document.getElementById("searchResult").innerHTML = "";
  document.getElementById("phpResponseText").innerHTML = "";
  document.getElementById("keywordTxt").value = '';
  document.getElementById("latTxt").value = '';
  document.getElementById("lonTxt").value = '';
//  document.getElementById("objGidTxt").value = '';
  $("#regionBtn").attr("disabled", false);
  $("#regionBtn").show();  
  $("#rangeBtn").attr("disabled", false);
  $("#rangeBtn").show();  
  if (geoLayerPtr != undefined)
    remove_geo_layer(geoLayerPtr);
  refresh_map();
  resetTraces();
}

// extract meta data blob from php backend, extract object_tb's gid and
// use that to grab the matching geoJson
function getQueryMeta(namedList) {
    var str="";
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
       var s = JSON.parse(str[i]);
       var gid=s['gid'];
// get info on this..
       var propdata={"content":"ABC", "color":"black"}; 
       getGeoJSONbyObjGid(gid, propdata);
    }
    return str;
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

function makeResultTable(str)
{
    var html="<table><tr><th>Gid</th><th>CFM5.2 Fault Object Name</th><th>Strike</th></tr>";
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=s['gid'];
       var name=s['name'];
       var strike=s['strike'];
       html=html+"<tr><td>" + gid + "</td><td>" + name + "</td> <td>" + strike + "</td></tr>";
    }
   html=html+ "</table>";
   return html;
}
