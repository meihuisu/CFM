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
                document.getElementById("phpResponseText").innerHTML = this.responseText;
                var str = getQueryMeta("metaByStrikeRange");
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
            document.getElementById("phpResponseText").innerHTML = this.responseText;
            var str=getQueryMeta("metaByFaultName");
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
            document.getElementById("phpResponseText").innerHTML = this.responseText;
            var str=getQueryMeta("metaByKeyword");
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
                document.getElementById("phpResponseText").innerHTML = this.responseText;
                var str=getQueryMeta("metaByLatLon");
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
                document.getElementById("phpResponseText").innerHTML = this.responseText;
                var str=getQueryMeta("metaByRegion");
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
                document.getElementById("phpResponseText").innerHTML = this.responseText;
                var str=getQueryMeta("metaBySection");
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
                document.getElementById("phpResponseText").innerHTML = this.responseText;
                var str=getQueryMeta("metaBySystem");
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
                document.getElementById("phpResponseText").innerHTML = this.responseText;
                var str=getQueryMeta("metaByName");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byName.php?q="+str,true);
        xmlhttp.send();
    }
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
            document.getElementById("phpResponseText").innerHTML = this.responseText;
            document.getElementById("regionList").innerHTML = makeRegionList();
        }
    };
    xmlhttp.open("GET","php/getRegionList.php",true);
    xmlhttp.send();
    $("#regionBtn").attr("disabled", true);  // only does it once
    $("#regionBtn").hide();  // only does it once
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
            document.getElementById("phpResponseText").innerHTML = this.responseText;
            document.getElementById("sectionList").innerHTML = makeSectionList();
        }
    };
    xmlhttp.open("GET","php/getSectionList.php",true);
    xmlhttp.send();
    $("#sectionBtn").attr("disabled", true);  // only does it once
    $("#sectionBtn").hide();  // only does it once
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
            document.getElementById("phpResponseText").innerHTML = this.responseText;
            document.getElementById("nameList").innerHTML = makeNameList();
        }
    };
    xmlhttp.open("GET","php/getNameList.php",true);
    xmlhttp.send();
    $("#nameBtn").attr("disabled", true);  // only does it once
    $("#nameBtn").hide();  // only does it once
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
            document.getElementById("phpResponseText").innerHTML = this.responseText;
            document.getElementById("systemList").innerHTML = makeSystemList();
        }
    };
    xmlhttp.open("GET","php/getSystemList.php",true);
    xmlhttp.send();
    $("#systemBtn").attr("disabled", true);  // only does it once
    $("#systemBtn").hide();  // only does it once
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
            document.getElementById("phpResponseText").innerHTML = this.responseText;
            document.getElementById("strikeRange").innerHTML = makeStrikeSlider();
            [rangeMin, rangeMax]=getStrikeRangeMinMax();
            setupSlider(rangeMin, rangeMax);
        }
    };
    xmlhttp.open("GET","php/getStrikeRange.php",true);
    xmlhttp.send();
    $("#rangeBtn").attr("disabled", true);  // only does it once
    $("#rangeBtn").hide();  // only does it once
}


function getGeoJSONbyObjGid(gitstr, meta) {
    // if gitstr is not set look for it in the input field
    if(typeof gitstr == 'undefined')   
        gitstr=document.getElementById("objGidTxt").value;

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
/* multiple faults per single layer
            addGeoJSONAsFeatureToList(geoJSON,parseInt(gitstr),meta);
*/
            makeGeoJSONFeature(geoJSON, parseInt(gitstr), meta);
            if(gotAllGeoJSON()) {
               plotAll();
               window.console.log("All the data is IN...");
            } 
        }
    };
    xmlhttp.open("GET","php/getGeoJSON.php?obj_gid="+gitstr,true);
    xmlhttp.send();
}

