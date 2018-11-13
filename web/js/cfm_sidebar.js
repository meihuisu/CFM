
/**

  cfm_sidebar.js

**/

var type_sidebar=false;
var keyword_sidebar=false;
var latlon_sidebar=false;
var strike_sidebar=false;
var gid_sidebar=false;

// initiate a click on the sidebar buttons
// to dismiss the sidebar
function dismissSidebar() {
  if(type_sidebar) typeClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();
}

// type sidebar js

function dismissType() {
  typeClick();
}

// slide out
function typeClick() {
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(gid_sidebar) gidClick();

  type_sidebar = !type_sidebar;
  if(type_sidebar) {
    sidebar_type_slideOut();
    $('#typeBtn').addClass('pick');
    } else {
      sidebar_type_slideIn();
      $('#typeBtn').removeClass('pick');
  }
}

function sidebar_type_slideOut() {
  if (jQuery('#type').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#type');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_type_slideIn() {
  if (jQuery('#type').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#type');
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
  if(type_sidebar) typeClick();
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
  if(type_sidebar) typeClick();
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
  if(type_sidebar) typeClick();
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
  if(type_sidebar) typeClick();
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
