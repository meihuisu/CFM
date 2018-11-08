/***
   cfm_ui.js
***/

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
    var html="<table><tr><th style=\"border:1px solid white\">CFM5.2 Fault Object Name</th></tr></table>";
    html=html+"<div style=\"overflow:auto; max-height: 300px; border:1px solid grey\"><table>";
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=s['gid'];
       var name=s['name'];
       html=html+"<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-star-empty\"></span></td><td style=\"width:25px\"></button><button class=\"btn btn-xs cfm-btn\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td>" + name + "</td></tr>";
    }
   html=html+ "</table></div>";
   return html;
}
