function refreshAll() {
  document.getElementById("searchByStrikeRangeResult").innerHTML = "<b>...</b>";
  document.getElementById("searchByKeywordResult").innerHTML = "<b>...</b>";
  document.getElementById("searchByRegionResult").innerHTML = "<b>...</b>";
  document.getElementById("regionList").innerHTML = "";
  document.getElementById("strikeRange").innerHTML = "";
  document.getElementById("searchByStrikeRangeResult").innerHTML = "<b>...</b>";
  document.getElementById("keywordTxt").value = '';
  $("#regionBtn").attr("disabled", false);
  $("#regionBtn").show();  
  $("#rangeBtn").attr("disabled", false);
  $("#rangeBtn").show();  
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

  window.console.log("setup slider..");
}

function searchWithStrikeRange() {
  //grab the min and max from the slider..
  vals = $( "#slider-strike-range" ).slider("option", "values");
  searchByStrikeRange(vals[0],vals[1]);
}
