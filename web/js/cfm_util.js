
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


function addGeoJSONAsFeature(geoJSON, gid, content) {
  if( typeof geoJSON === 'object') {
     blob= geoJSON;
     } else {
       blob=JSON.parse(geoJSON);
  }

  var tmp= { "id":gid,
             "type":"Feature", 
             "properties": { "popupContent": content,
                             "style": {
                                 "weight":5,
                                 "stroke":"#ff7800",
                                 "opacity":1
                            }},
             "geometry": blob 
          };

  cfmTraceList.features.push(tmp);
}

function plotAll() {
  load_geo();
}

function refreshAll() {
  document.getElementById("searchByStrikeRangeResult").innerHTML = "<b>...</b>";
  document.getElementById("searchByKeywordResult").innerHTML = "<b>...</b>";
  document.getElementById("searchByRegionResult").innerHTML = "<b>...</b>";
  document.getElementById("searchByLatlonResult").innerHTML = "<b>...</b>";
  document.getElementById("geoSearchByObjGidResult").innerHTML = "";
  document.getElementById("regionList").innerHTML = "";
  document.getElementById("strikeRange").innerHTML = "";
  document.getElementById("searchByStrikeRangeResult").innerHTML = "<b>...</b>";
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

function setQueryGitList(namedList) {
    var str="";
    if (namedList == 'gitListByLatLon') {
        str = $('[data-side="gitListByLatLon"]').data('params');
    }
    if (namedList == 'gitListByKeyword') {
        str = $('[data-side="gitListByKeyword"]').data('params');
    }
    if (namedList == 'gitListByRegion') {
        str = $('[data-side="gitListByRegion"]').data('params');
    }
    if (namedList == 'gitListByStrikeRange') {
        str = $('[data-side="gitListByStrikeRange"]').data('params');
    }
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
      getGeoJSONbyObjGid(str[i]);
    }
    return str;
}

function getGeoJSON() {
    var alist = $('[data-side="geo-json"]').data('params');
    var str=alist[0];
    return str;
}

function getMetaJSON() {
    var str = $('[data-side="meta-json"]').data('params');
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
