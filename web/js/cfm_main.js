var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();

  getGeoTraceList();
  getAllTraces();
  setupSearch();

}) // end of MAIN



