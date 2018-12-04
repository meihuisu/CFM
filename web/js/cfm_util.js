/***
   cfm_util.js

***/

// strike range is from 5 to 359
var strike_range_min = 0;
var strike_range_max = 0;

function reset_strike_range()
{
  $( "#strike-range" ).val( strike_range_min + " - " + strike_range_max );
  $( "#slider-strike-range" ).slider("option", "values" ,[strike_range_min, strike_range_max]);
}

function setup_strike_range(min,max)
{
   strike_range_min=min;
   strike_range_max=max;
}

function reset_select_region() {
  document.getElementById('selectRegion').selectedIndex=0;
}

function reset_select_section() {
  document.getElementById('selectSection').selectedIndex = 0;
}

function reset_select_system() {
  document.getElementById('selectSystem').selectedIndex = 0;
}

function reset_select_name() {
  document.getElementById('selectName').selectedIndex = 0;
}

function reset_select_keyword() {
  document.getElementById("keywordTxt").value = '';
}

function reset_select_latlon() {
  document.getElementById("latTxt").value = '';
  document.getElementById("lonTxt").value = '';
}

function plotAll() {
//  load_geo_list_layer();
  load_trace_list();
}

function toggleAll() {
  takeDownPopup(viewermap);
  cfm_toggle_plot= !cfm_toggle_plot;
  if(cfm_toggle_plot) {
    toggle_on_all_layer()
    makeResultTableWithList(cfm_gid_list);
    } else {
      toggle_off_all_layer()
      // need to revert to the current search result
      makeResultTableWithList(cfm_active_gid_list);
  }
}

function refreshAll() {
  reset_select_region();
  reset_select_section();
  reset_select_system();
  reset_select_name();
  reset_strike_range();
  reset_select_keyword();
  reset_select_latlon();
  document.getElementById("geoSearchByObjGidResult").innerHTML = "";
  document.getElementById("searchResult").innerHTML = "";
  document.getElementById("phpResponseTxt").innerHTML = "";
//  document.getElementById("objGidTxt").value = '';
  refresh_map();
  dismiss_sidebar();
  reset_geo_plot();
}

function _item(meta,str,type,name) {
    if(meta[type] == undefined || meta[type] == "") {
       str = str + "<br>" + name+ ": NA";
       } else {
         str = str + "<br>" + name+ ": "+meta[type];
    }
    return str;
}
function getLevel1ContentFromMeta(meta) {
    var content=meta['fault'];
    content=content+"<br>--------------------";
    content=content+"<br>SYSTEM: "+meta['system'];
    content=content+"<br>REGION: "+meta['region'];
    content=content+"<br>SECTION: "+meta['section'];
    content=content+"<br>";
    content=_item(meta,content,'source_Author','AUTHOR');
    content=content+"<br>VERSION: "+meta['CFM_version'];
    content=content+"<br>USGS_ID: "+meta['USGS_ID'];
    return content;
}

function getLevel2ContentFromMeta(meta) {
// get info on this..
    var content=meta['fault'];
    content=content+"<br>--------------------";
    content=_item(meta,content,'strike','STRIKE');
    content=_item(meta,content,'dip','DIP');
    content=_item(meta,content,'area','AREA');
    content=_item(meta,content,'exposure','EXPOSURE');
    content=_item(meta,content,'final_slip_sense','FINAL_SLIP_SENSE');
    return content;
}

function getLevel3ContentFromMeta(meta) {
// get info on this..
    var content=meta['fault'];
    content=content+"<br>--------------------";
    content=_item(meta,content,'alternative','ALTERNATIVE');
    content=_item(meta,content,'model_description','MODEL_DESCRIPTION');
    content=_item(meta,content,'descriptor','DESCRIPTOR');
    content=_item(meta,content,'reference','REFERENCE');
    content=_item(meta,content,'reference_check','REFERENCE_CHECK');
    content=_item(meta,content,'ID_comments','ID_COMMENTS');
    return content;
}

function getGidFromMeta(meta) {
   var gid=meta['gid'];
   return gid;
}

function getColorFromMeta(meta) {
    var strike=meta['strike'];
    var color="black";
    if(strike != undefined && strike != "") {
        v=parseInt(strike);
        v=(v-strike_range_min)/(strike_range_max-strike_range_min);
        blue = Math.round(255 * v);
        green = 0;
        red = Math.round((1-v)*255);
        color="RGB(" + red + "," + green + "," + blue + ")";
     } 
     return color;
}


function processGeoList() {
    geostr = $('[data-side="allGeoList"]').data('params');
    nogeostr = $('[data-side="allNoGeoList"]').data('params');
    if(geostr == undefined || nogeostr == undefined) {
        window.console.log("BAD BAD BAD");
        return;
    }

    var sz=geostr.length;
    window.console.log("Number of geo gid from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var gidstr=geostr[i];
       var gid=parseInt(gidstr);
       cfm_gid_list.push(gid);
    }

    sz=nogeostr.length;
    window.console.log("Number of no geo gid from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var gidstr=nogeostr[i];
       var gid=parseInt(gidstr);
       cfm_gid_list.push(gid);
       cfm_nogeo_gid_list.push(gid);
    }
    window.console.log("total mixed geo..", cfm_gid_list.length);

}

// extract meta data blob from php backend, extract object_tb's gid and 
// use that to grab the matching geoJson
function processTraceMeta(metaList) {
    var str="";

    if (metaList == 'metaByAllTraces') {
        str = $('[data-side="allTraces"]').data('params');
    }

    if(str == undefined) {
       window.console.log("BAD BAD BAD");
       return;
    }

    var sz=(Object.keys(str).length);
    window.console.log("Number of meta blobs received from backend ->",sz);
    // iterate through the list and grab the geo info and update leaflet feature
    // structure one by one
    for( var i=0; i< sz; i++) {
       var t=str[i];
       var meta = JSON.parse(str[i]);
       var gidstr=meta['gid'];
       var gid=parseInt(gidstr);
       if(metaList == 'metaByAllTraces') {
         cfm_fault_meta_list.push({"gid":gid, "meta": meta });
         if( !in_nogeo_gid_list(gid)) {
           getGeoJSONbyObjGid(gidstr,meta);
         }
         } else {
           window.console.log("BAD ??");
       }
    }
    return str;
}

function processSearchResult(rlist) {
    cfm_search_gid_list=[];
    var str="";
    if (rlist == 'searchByFaultObjectName') {
        str = $('[data-side="resultByFaultObjectName"]').data('params');
    }
    if (rlist == 'searchByLatLon') {
        str = $('[data-side="resultByLatLon"]').data('params');
    }
    if (rlist == 'searchByKeyword') {
        str = $('[data-side="resultByKeyword"]').data('params');
    }
    if (rlist == 'searchBySystem') {
        str = $('[data-side="resultBySystem"]').data('params');
    }
    if (rlist == 'searchByRegion') {
        str = $('[data-side="resultByRegion"]').data('params');
    }
    if (rlist == 'searchBySection') {
        str = $('[data-side="resultBySection"]').data('params');
    }
    if (rlist == 'searchByName') {
        str = $('[data-side="resultByName"]').data('params');
    }
    if (rlist == 'searchByStrikeRange') {
        str = $('[data-side="resultByStrikeRange"]').data('params');
    }

    if(str == undefined) {
       window.console.log("BAD BAD BAD");
       return;
    }

    // gid, name
    var sz=(Object.keys(str).length);
    window.console.log("Number of gid blobs received from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var tmp= JSON.parse(str[i]);
       var gid=parseInt(tmp['gid']);
       cfm_active_gid_list.push(gid);
       if( ! in_nogeo_gid_list(gid)) {
          toggle_layer(gid);
       }
   
    }
    return (str);
}

function gotAllGeoJSON() {
  if (cfm_fault_meta_list.length == cfm_trace_list.length)
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
