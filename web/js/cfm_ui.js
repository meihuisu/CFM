/***
   cfm_ui.js
***/

function setupSlider(min,max) {
  setup_strike_range(min,max);
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

function queryByType(type)
{
  if(type == "system") { getSystemList(); }
  if(type == "region") { getRegionList(); }
  if(type == "section") { getSectionList(); }
  if(type == "name") { getNameList(); }
}




// use the region list from php backend, generate the form html
function makeRegionList() {
    var str = $('[data-side="regions"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select id=\"selectRegion\" onchange=\"searchByRegion(this.value)\"> <option value=\"\">  Click to select a Region</option>";

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

    var html= "<form autocomplete=\"off\"><select id=\"selectSection\" onchange=\"searchBySection(this.value)\"> <option value=\"\">  Click to select a Section</option>";

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

    var html= "<form autocomplete=\"off\"> <select id=\"selectSystem\" onchange=\"searchBySystem(this.value)\"> <option value=\"\">  Click to select a System</option>";

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

    var html= "<form autocomplete=\"off\"> <select id=\"selectName\" onchange=\"searchByName(this.value)\"> <option value=\"\">  Click to select a Name</option>";

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
    var html="Strike range: <input type=\"text\" id=\"strike-range\" readonly style=\"border:0; color:orange; text-align:center;\"><button id=\"strikeBtn\" type=\"button\" title=\"search with strike range\" class=\"btn btn-default\" style=\"border:0; color:blue\" onclick=\"searchWithStrikeRange()\"><span class=\"glyphicon glyphicon-search\"></span></button></div><div id=\"slider-strike-range\"></div><br>";
    return html;
} 

function nullTableEntry(target) {
   // disable the toggle and highlight button
   t_btn="#toggle_"+target;
   h_btn="#highlight_"+target; 
   $(t_btn).attr("disabled", true);
   $(h_btn).attr("disabled", true);
}

function glistFromMeta(str) {
    var glist=[];
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s=str[i];
       var s = JSON.parse(str[i]);
       var gidstr=s['gid'];
       var gid=parseInt(s['gid']);
       glist.push(gid);
    }
    return glist;
}


// str=metadata
function makeResultTable(str)
{
    var html="<table><tr><th style=\"border:1px solid white;\">CFM5.2 Fault Objects</th></tr></table>";
    html=html+"<div class=\"cfm-table\" ><table>";
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s=str[i];
       var s = JSON.parse(str[i]);
       var gidstr=s['gid'];
       var gid=parseInt(s['gid']);
       var name=s['name'];
       if(!in_nogeo_gid_list(gid)) {
         html=html+"<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-star-empty\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"downloads\" onclick=download_layer("+gid+");><span id=\"download_"+gid+"\" class=\"glyphicon glyphicon-download\"></span></button></td><td>" + name + "</td></tr>";
        } else {
         html=html+"<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+") disabled><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-star-empty\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+") disabled><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td> <td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"downloads\" onclick=download_layer("+gid+");><span id=\"download_"+gid+"\" class=\"glyphicon glyphicon-download\"></span></button></td><td>" + name + "</td></tr>";
      }
    }
    html=html+ "</table></div>";
    return html;
}

// using internal information, existing style_list
function _makeResultTableWithGList(glist)
{
    var html="<table><tr><th style=\"border:1px solid white\">CFM5.2 Fault Objects</th></tr></table>";
    html=html+"<div class=\"cfm-table\" ><table>";
    var sz=glist.length;
    for( var i=0; i< sz; i++) {
       var gid=glist[i];
       var t=find_meta_list(gid);
       var meta=t['meta'];
       var name=meta['name'];
       if(!in_nogeo_gid_list(gid)) {
         var s= find_style_list(gid);
         var h= s['highlight'];
         if(h!= undefined) {
           html=html+"<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-star\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"downloads\" onclick=download_layer("+gid+");><span id=\"download_"+gid+"\" class=\"glyphicon glyphicon-download\"></span></button></td><td>" + name + "</td></tr>";
           } else {
             html=html+"<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-star-empty\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"downloads\" onclick=download_layer("+gid+");><span id=\"download_"+gid+"\" class=\"glyphicon glyphicon-download\"></span></button></td><td>" + name + "</td></tr>";
        }
        } else {
         html=html+"<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+") disabled><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-star-empty\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+") disabled><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td> <td style=\"width:25px\"><button class=\"btn btn-xs cfm-btn\" title=\"downloads\" onclick=download_layer("+gid+");><span id=\"download_"+gid+"\" class=\"glyphicon glyphicon-download\"></span></button></td><td>" + name + "</td></tr>";
       }
    }
    html=html+ "</table></div>";
    return html;
}


// using existing gid_list,
function makeResultTableWithList(glist)
{
    // reset it first
    document.getElementById("searchResult").innerHTML ="";

    window.console.log("using active list..");

    if(glist.length > 0) {
      toggle_layer_with_list(glist);
      document.getElementById("searchResult").innerHTML = _makeResultTableWithGList(glist);
    }
}
