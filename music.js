var five = require("johnny-five");

var cmd = require('node-cmd');

board = new five.Board();

volume = 0;
frequency = 0;
channel = 0;
shape = 0;

shapes = ['sine.ck','traingle.ck','square.ck','saw.ck','pulse.ck','phasor.ck'];

cmd.run('chuck + ./chuck/sine.ck:1000:0.0');
cmd.run('chuck + ./chuck/sine.ck:1000:0.0');
cmd.run('chuck + ./chuck/sine.ck:1000:0.0');

board.on("ready", function() {



	function set() {
		shape_set = shapes[shape];
		command_prep = "chuck = " + channel.toString() + " ./chuck/"+ shape_set+":"+frequency.toString()+":"+volume.toString();
		console.log(command_prep);
		cmd.run(command_prep);
	}

	console.log("START!");

  var led1 = new five.Led(13);
  var led2 = new five.Led(12);
  var led3 = new five.Led(11);

  var led4 = new five.Led(6);
  var led5 = new five.Led(5);
  var led6 = new five.Led(4);

  potentiometer1 = new five.Sensor({
    pin: "A0",
    freq: 1
  });

  potentiometer2 = new five.Sensor({
    pin: "A1",
    freq: 1
  });

  potentiometer3 = new five.Sensor({
    pin: "A2",
    freq: 1
  });

  potentiometer4 = new five.Sensor({
   pin: "A3",
   freq: 1
 });

  fsr = new five.Sensor({
    pin: "A5",
    freq: 10
  });


  board.repl.inject({
    pot1: potentiometer1,
    pot2: potentiometer2,
    pot3: potentiometer3,
    pot4: potentiometer4,
    force: fsr,
    led1 : led1,
    led2 : led2,
    led3 : led3,
    led4 : led4,
    led5 : led5,
    led6 : led6,
  });


  potentiometer1.scale([0,1]).on("data", function() {
    // console.log("Volume Selection",this.scaled);
    volume = this.scaled;
    //volume
  });

  potentiometer2.scale([0,1024]).on("data", function() {
    // console.log("Frequency Selection",this.scaled);
    //frequency
    frequency = Math.round(this.scaled);
  });

  potentiometer3.scale([1,3]).on("data", function() {
    // console.log("Channel Selection",this.scaled);
    //channel
    channel = Math.round(this.scaled);

  });

 potentiometer4.scale([0,5]).on("data", function() {
    shape = Math.round(this.scaled);
 });

  fsr.scale([0, 100]).on("data", function() {
  	//force
  	if(this.raw>10) {
  		set();
  	}
  	//console.log("FORCE", this.scaled);
    	//console.log("Volume:",volume," Frequency:",frequency," Channel:",channel);
    

  });


});