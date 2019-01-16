var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();

// handle keyword's input completion
  $("#keywordTxt").keyup(function(event) {
        if (event.keyCode === 13) {
            searchByKeyword();
        }
  });     


  getGeoTraceList();
  getAllTraces();
  setupSearch();
  addFaultColorsSelect();
  addDownloadSelect();
}) // end of MAIN



