
/**

  cfm_sidebar.js

**/

var system_sidebar=false;
var region_sidebar=false;
var section_sidebar=false;
var name_sidebar=false;
var keyword_sidebar=false;
var latlon_sidebar=false;
var strike_sidebar=false;
var gid_sidebar=false;

// initiate a click on the sidebar buttons
// to dismiss the sidebar
function dismissSidebar() {
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(system_sidebar) systemClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();
}

// system sidebar js

function dismissSystem() {
  systemClick();
}

// slide out
function systemClick() {
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();

  system_sidebar = !system_sidebar;
  if(system_sidebar) {
    sidebar_system_slideOut();
    $('#systemBtn').addClass('pick');
    } else {
      sidebar_system_slideIn();
      $('#systemBtn').removeClass('pick');
  }
}

function sidebar_system_slideOut() {
  if (jQuery('#system').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#system');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_system_slideIn() {
  if (jQuery('#system').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#system');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}


// region sidebar
function dismissRegion() {
  regionClick();
}

// slide out
function regionClick() {
  if(system_sidebar) systemClick();
  if(section_sidebar) sectionClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();

  region_sidebar = !region_sidebar;
  if(region_sidebar) {
    sidebar_region_slideOut();
    $('#regionBtn').addClass('pick');
    } else {
      sidebar_region_slideIn();
      $('#regionBtn').removeClass('pick');
  }
}

function sidebar_region_slideOut() {
  if (jQuery('#region').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#region');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_region_slideIn() {
  if (jQuery('#region').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#region');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}


// section sidebar js
function dismissSection() {
  sectionClick();
}

// slide out
function sectionClick() {
  if(system_sidebar) systemClick();
  if(region_sidebar) regionClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();

  section_sidebar = !section_sidebar;
  if(section_sidebar) {
    sidebar_section_slideOut();
    $('#sectionBtn').addClass('pick');
    } else {
      sidebar_section_slideIn();
      $('#sectionBtn').removeClass('pick');
  }
}

function sidebar_section_slideOut() {
  if (jQuery('#section').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#section');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_section_slideIn() {
  if (jQuery('#section').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#section');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}

// name sidebar js
function dismissName() {
  nameClick();
}

// slide out
function nameClick() {
  if(system_sidebar) systemClick();
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();

  name_sidebar = !name_sidebar;
  if(name_sidebar) {
    sidebar_name_slideOut();
    $('#nameBtn').addClass('pick');
    } else {
      sidebar_name_slideIn();
      $('#nameBtn').removeClass('pick');
  }
}

function sidebar_name_slideOut() {
  if (jQuery('#name').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#name');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_name_slideIn() {
  if (jQuery('#name').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#name');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}


// keyword sidebar js

// or could initiate a 'click' on
// the keywordButton
function dismissKeyword() {
  keywordClick();
}

// slide out
function keywordClick() {
  if(system_sidebar) systemClick();
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(name_sidebar) nameClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();

  keyword_sidebar = !keyword_sidebar;
  if(keyword_sidebar) {
    sidebar_keyword_slideOut();
    $('#keywordBtn').addClass('pick');
    } else {
      sidebar_keyword_slideIn();
      $('#keywordBtn').removeClass('pick');
  }
}

function sidebar_keyword_slideOut() {
  if (jQuery('#keyword').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#keyword');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_keyword_slideIn() {
  if (jQuery('#keyword').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#keyword');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}

// strike sidebar js

// or could initiate a 'click' on
// the strikeButton
function dismissStrike() {
  strikeClick();
}

// slide out
function strikeClick() {
  if(system_sidebar) systemClick();
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(gid_sidebar) gidClick();

  strike_sidebar = !strike_sidebar;
  if(strike_sidebar) {
    sidebar_strike_slideOut();
    $('#strikeBtn').addClass('pick');
    } else {
      sidebar_strike_slideIn();
      $('#strikeBtn').removeClass('pick');
  }
}

function sidebar_strike_slideOut() {
  if (jQuery('#strike').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#strike');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_strike_slideIn() {
  if (jQuery('#strike').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#strike');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}

// latlon sidebar js

// or could initiate a 'click' on
// the latlonButton
function dismissLatlon() {
  latlonClick();
}

// slide out
function latlonClick() {
  if(system_sidebar) systemClick();
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();

  latlon_sidebar = !latlon_sidebar;
  if(latlon_sidebar) {
    sidebar_latlon_slideOut();
    $('#latlonBtn').addClass('pick');
    } else {
      sidebar_latlon_slideIn();
      $('#latlonBtn').removeClass('pick');
  }
}

function sidebar_latlon_slideOut() {
  if (jQuery('#latlon').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#latlon');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_latlon_slideIn() {
  if (jQuery('#latlon').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#latlon');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}

// gid sidebar js

// or could initiate a 'click' on
// the gidButton
function dismissGid() {
  gidClick();
}

// slide out
function gidClick() {
  if(system_sidebar) systemClick();
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(strike_sidebar) strikeClick();
  if(latlon_sidebar) latlonClick();

  gid_sidebar = !gid_sidebar;
  if(gid_sidebar) {
    sidebar_gid_slideOut();
    $('#gidBtn').addClass('pick');
    } else {
      sidebar_gid_slideIn();
      $('#gidBtn').removeClass('pick');
  }
}

function sidebar_gid_slideOut() {
  if (jQuery('#gid').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#gid');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_gid_slideIn() {
  if (jQuery('#gi').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#gid');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}
