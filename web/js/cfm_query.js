function searchByStrikeRange(min,max) {
    if (min == "" || max == "") {
        document.getElementById("searchResult").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str = processSearchResult("searchByStrikeRange");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byStrikeRange.php?min="+min+"&max="+max,true);
        xmlhttp.send();
    }
}


function searchWithStrikeRange() {
  //grab the min and max from the slider..
  vals = $( "#slider-strike-range" ).slider("option", "values");
  searchByStrikeRange(vals[0],vals[1]);
}


function searchByFaultObjectName() {
    str=document.getElementById("faultNameTxt").value;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            toggle_off_all_layer();
            cfm_active_gid_list=[];
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("searchByFaultName");
            document.getElementById("searchResult").innerHTML = makeResultTable(str);
        }
    };
    xmlhttp.open("GET","php/byFaultObjectName.php?q="+str,true);
    xmlhttp.send();
}
function searchByKeyword() {
    str=document.getElementById("keywordTxt").value;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            toggle_off_all_layer();
            cfm_active_gid_list=[];
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("searchByKeyword");
            document.getElementById("searchResult").innerHTML = makeResultTable(str);
        }
    };
    xmlhttp.open("GET","php/byKeyword.php?q="+str,true);
    xmlhttp.send();
}

function searchByLatlon() {
    latstr=document.getElementById("latTxt").value;
    window.console.log("lat");
    window.console.log(latstr);
    lonstr=document.getElementById("lonTxt").value;
    window.console.log("lon");
    window.console.log(lonstr);
    if (latstr == "" || lonstr=="") {
        document.getElementById("searchResult").innerHTML = "";
        return;
    } else {

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByLatLon");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        }
        xmlhttp.open("GET","php/byLatlon.php?lat="+latstr+"&lon="+lonstr,true);
        xmlhttp.send();
    }
}

function searchByRegion(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByRegion");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byRegion.php?q="+str,true);
        xmlhttp.send();
    }
}

function searchBySection(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchBySection");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/bySection.php?q="+str,true);
        xmlhttp.send();
    }
}

function searchBySystem(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchBySystem");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/bySystem.php?q="+str,true);
        xmlhttp.send();
    }
}


function searchByName(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByName");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byName.php?q="+str,true);
        xmlhttp.send();
    }
}


// returning 2 lists, one is gid list where each gid has a geo/shapefile
//                    one is nogid list where no gid has a geo/shapefile
function getGeoTraceList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            processGeoList();
        }
    };
    xmlhttp.open("GET","php/getGeoTraceList.php",true);
    xmlhttp.send();
}


function getAllTraces() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processTraceMeta("metaByAllTraces");
            document.getElementById("searchResult").innerHTML = makeResultTable(str);
        }
    };
    xmlhttp.open("GET","php/getAllTraces.php",true);
    xmlhttp.send();
}

function getRegionList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("regionList").innerHTML = makeRegionList();
        }
    };
    xmlhttp.open("GET","php/getRegionList.php",true);
    xmlhttp.send();
}

function getSectionList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("sectionList").innerHTML = makeSectionList();
        }
    };
    xmlhttp.open("GET","php/getSectionList.php",true);
    xmlhttp.send();
}

function getNameList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("nameList").innerHTML = makeNameList();
        }
    };
    xmlhttp.open("GET","php/getNameList.php",true);
    xmlhttp.send();
}


function getSystemList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("systemList").innerHTML = makeSystemList();
        }
    };
    xmlhttp.open("GET","php/getSystemList.php",true);
    xmlhttp.send();
}


function getStrikeRange() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("strikeRange").innerHTML = makeStrikeSlider();
            [rangeMin, rangeMax]=getStrikeRangeMinMax();
            setupSlider(rangeMin, rangeMax);
        }
    };
    xmlhttp.open("GET","php/getStrikeRange.php",true);
    xmlhttp.send();
}



function getGeoJSONbyObjGid(gidstr, meta) {
    // if gidstr is not set look for it in the input field
    if(typeof gidstr == 'undefined')   
        gidstr=document.getElementById("objGidTxt").value;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("geoSearchByObjGidResult").innerHTML = this.responseText;
            // grab the geoJSON
            var geoJSON=getGeoJSON();
            var gid=parseInt(gidstr);
/* multiple faults per single layer
            addGeoJSONAsFeatureToList(geoJSON,gid,meta);
*/
            var trace=makeGeoJSONFeature(geoJSON, gid, meta);
            if(trace != undefined)
              load_a_trace(gid,trace);
        }
    };
    xmlhttp.open("GET","php/getGeoJSON.php?obj_gid="+gidstr,true);
    xmlhttp.send();
}


function setupSearch()
{
   queryByType("system");
   queryByType("region");
   queryByType("section");
   queryByType("name");
   getStrikeRange();
}
