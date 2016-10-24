var resemble = require('node-resemble');
var fs = require('fs');

var diff = resemble('screenshots/components/demos/badge_375x200.png')
  .compareTo('expectations/components/demos/badge_375x200.png').onComplete(function(data){
    console.log(data);
    var imgDataUrl = data.getImageDataUrl();
    var base64Data = imgDataUrl.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
      console.log(err);
    });
});
