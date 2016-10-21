var resemble = require('resemblejs')

var diff = resemble('screenshots/components/demos/badge_375x200.png')
  .compareTo('tests/expectations/components/demos/badge_375x200.png').onComplete(function(data){
    console.log(data);
    /*
    {
      misMatchPercentage : 100, // %
      isSameDimensions: true, // or false
      dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
      getImageDataUrl: function(){}
    }
    */
});
