/***
   cfm_util.js

***/

function plotAll() {
//  load_geo_list_layer();
  load_trace_list();
  skip_gid_list();
}

function toggleAll() {
  cfm_toggle_plot= !cfm_toggle_plot;
  if(cfm_toggle_plot) {
    toggle_on_all_layer()
    } else {
      toggle_off_all_layer()
  }
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
    if (namedList == 'metaByFaultObjectName') {
        str = $('[data-side="metaByFaultObjectName"]').data('params');
    }
    if (namedList == 'metaByLatLon') {
        str = $('[data-side="metaByLatLon"]').data('params');
    }
    if (namedList == 'metaByKeyword') {
        str = $('[data-side="metaByKeyword"]').data('params');
    }
    if (namedList == 'metaBySystem') {
        str = $('[data-side="metaBySystem"]').data('params');
    }
    if (namedList == 'metaByRegion') {
        str = $('[data-side="metaByRegion"]').data('params');
    }
    if (namedList == 'metaBySection') {
        str = $('[data-side="metaBySection"]').data('params');
    }
    if (namedList == 'metaByName') {
        str = $('[data-side="metaByName"]').data('params');
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
       cfm_fault_meta_list.push({"gid":gid, "meta": meta });
       getGeoJSONbyObjGid(gidstr,meta);
    }
    return str;
}

function gotAllGeoJSON() {
  if (cfm_fault_meta_list.length == (cfm_gid_list.length+cfm_skip_gid_list.length))
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
       var abb=s['abb'];
       var name=s['name'];
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
    }
    return html;
}

// use the section list from php backend, generate the form html
function makeSectionList() {
    var str = $('[data-side="sections"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select name=\"users\" onchange=\"searchBySection(this.value)\"> <option value=\"\">  Click to select a Section</option>";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var abb=s['abb'];
       var name=s['name'];
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
    }
    return html;
}

// use the system list from php backend, generate the form html
function makeSystemList() {
    var str = $('[data-side="systems"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select name=\"users\" onchange=\"searchBySystem(this.value)\"> <option value=\"\">  Click to select a System</option>";

    var sz=(Object.keys(str).length);
    window.console.log("Number of systems received from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var abb=s['abb'];
       var name=s['name'];
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
    }
    return html;
}

// use the fault list from php backend, generate the form html
function makeNameList() {
    var str = $('[data-side="names"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select name=\"users\" onchange=\"searchByName(this.value)\"> <option value=\"\">  Click to select a Name</option>";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var abb=s['abb'];
       var name=s['name'];
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
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
  var row="row_"+gid;
  dptr= document.getElementById(row);
  if(dptr) 
     dptr.style.display= "none"; 
}


// str=metadata
function makeResultTable(str)
{
    var html="<table><tr><th></th><th>CFM5.2 Fault Object Name</th></tr>";
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=s['gid'];
       var name=s['name'];
       html=html+"<tr id=\"row_"+gid+"\"><td><button onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-star-empty\"></span></button><button onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td>" + name + "</td></tr>";
    }
   html=html+ "</table>";
   return html;
}
