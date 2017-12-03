var five = require('johnny-five');
var board = new five.Board();

 
board.on('ready', function() {
  var led = new five.Led(9); // pin 13
  led.blink(500); // 500ms interval

  slider.scale([0, 100]).on("slide", function() {
    console.log("slide", this.value);
  });

});


