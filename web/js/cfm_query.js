
function searchByStrikeRange(min,max) {
    if (min == "" || max == "") {
        document.getElementById("searchByStrikeRangeResult").innerHTML = "";
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
                document.getElementById("searchByStrikeRangeResult").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","php/byStrikeRange.php?min="+min+"&max="+max,true);
        xmlhttp.send();
    }
}

function searchByKeyword() {
    str=document.getElementById("keywordTxt").value;
    window.console.log("XXX");
    window.console.log(str);
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("searchByKeywordResult").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET","php/byKeyword.php?q="+str,true);
    xmlhttp.send();
}


function searchBySystem(str) {
    if (str == "") {
        document.getElementById("searchBySystemResult").innerHTML = "";
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
                document.getElementById("searchBySystemResult").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","php/bySystem.php?q="+str,true);
        xmlhttp.send();
    }
}

function searchByRegion(str) {
    if (str == "") {
        document.getElementById("searchByRegionResult").innerHTML = "";
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
                document.getElementById("searchByRegionResult").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","php/byRegion.php?q="+str,true);
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
            document.getElementById("regionList").innerHTML = this.responseText;
            window.console.log(this.responseText);
        }
    };
    xmlhttp.open("GET","php/getRegionList.php",true);
    xmlhttp.send();
    $("#regionBtn").attr("disabled", true);  // only does it once
    $("#regionBtn").hide();  // only does it once
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
            document.getElementById("strikeRange").innerHTML = this.responseText;
            window.console.log(this.responseText);
            // parse responsetText for min and max
            [rangeMin, rangeMax]=getMinMax(this.responseText);
            setupSlider(rangeMin, rangeMax);
        }
    };
    xmlhttp.open("GET","php/getStrikeRange.php",true);
    xmlhttp.send();
    $("#strikeBtn").attr("disabled", true);  // only does it once
    $("#strikeBtn").hide();  // only does it once
}

function getMinMax(str) {
    var subs=str.split('!',5);
    rMin=parseInt(subs[2]);
    rMax=parseInt(subs[3]);  
    return [rMin, rMax];
}


jQuery(document).ready(function() {

  window.console.log("in Ready call..");
  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

}) // end of MAIN

