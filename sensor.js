var five = require("johnny-five"),
  board, potentiometer;

var MPlayer = require('mplayer');



// function change_to(pot,track) {
//     path[pot] = players_paths[pot][track];
//     players[pot].openFile(path[pot]);
// }

// function adjust_vol(pot,vol) {
//   players[pot].volume(vol);
// }



board = new five.Board();
players = [new MPlayer(), new MPlayer(), new MPlayer()]
players_paths = [

['./1/1.wav','./1/2.wav','./1/3.wav'],
['./2/1.wav','./2/2.wav','./2/3.wav'],
['./3/1.wav','./3/2.wav','./3/3.wav']
];

path = ['./1/1.wav','./2/1.wav','./3/1.wav'];

pots = [0,0,0];

board.on("ready", function() {

// for(var i=0; i<3; i++) {
    players[0].on('stop',function() { players[0].openFile(path[0])});
    players[1].on('stop',function() { players[1].openFile(path[1])});
    players[2].on('stop',function() { players[2].openFile(path[2])});
// }

  // Create a new `potentiometer` hardware instance.

  var led1 = new five.Led(7);
  var led2 = new five.Led(8);
  var led3 = new five.Led(9);

  var led4 = new five.Led(6);
  var led5 = new five.Led(5);
  var led6 = new five.Led(4);

  var led7 = new five.Led(1);
  var led8 = new five.Led(2);
  var led9 = new five.Led(3);

  led_bunch = [[led1,led2,led3],[led4,led5,led6],[led7,led8,led9]];


  photoresistor1 = new five.Sensor({
    pin: "A4",
    freq: 250
  });

  photoresistor2 = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  photoresistor3 = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  potentiometer1 = new five.Sensor({
    pin: "A5",
    freq: 250
  });

  potentiometer2 = new five.Sensor({
    pin: "A3",
    freq: 250
  });

  potentiometer3 = new five.Sensor({
    pin: "A1",
    freq: 250
  });

  board.repl.inject({
    pot1: potentiometer1,
    photo1: photoresistor1,
    pot2: potentiometer2,
    photo2: photoresistor2,
    pot3: potentiometer3,
    photo3: photoresistor3,

    p_l_1 : led1,
    p_l_2 : led2,
    p_l_3 : led3,
    p_l_4 : led4,
    p_l_5 : led5,
    p_l_6 : led6,
    p_l_7 : led7,
    p_l_8 : led8,
    p_l_9 : led9,

  });


  potentiometer1.on("data", function() {

    console.log(this.value, this.raw);

    if(this.value <= 341) {
      new_pot = 0;
    }
    else if(this.value > 341 && this.value < 682 )
    {
      new_pot = 1;
    }
    else
    {
      new_pot = 2
    }

    if (pots[0] != new_pot) {
      pots[0] = new_pot;
      path[0] = players_paths[0][new_pot];
      console.log("herer");
      players[0].openFile(path[0]);

      if(new_pot == 0) {
        led1.on();
        led2.off();
        led3.off();
      }

      if(new_pot == 1) {
        led1.off();
        led2.on();
        led3.off();
      }

      if(new_pot == 2) {
        led1.off();
        led2.off();
        led3.on();
      }

      // for(var j=0; j<3; j++) {
      //   if(new_pot == j) {
      //     led_bunch[i][j].on();
      //   }
      //   else {
      //     led_bunch[i][j].off();
      //   }
      // }
    }



  });

  potentiometer2.on("data", function() {

    console.log(this.value, this.raw);

    if(this.value <= 341) {
      new_pot = 0;
    }
    else if(this.value > 341 && this.value < 682 )
    {
      new_pot = 1;
    }
    else
    {
      new_pot = 2
    }

    if (pots[1] != new_pot) {
      pots[1] = new_pot;
      path[1] = players_paths[1][new_pot];
      console.log("herer");
      players[1].openFile(path[1]);

      if(new_pot == 0) {
        led4.on();
        led5.off();
        led6.off();
      }

      if(new_pot == 1) {
        led4.off();
        led5.on();
        led6.off();
      }

      if(new_pot == 2) {
        led4.off();
        led5.off();
        led6.on();
      }

      // for(var j=0; j<3; j++) {
      //   if(new_pot == j) {
      //     led_bunch[i][j].on();
      //   }
      //   else {
      //     led_bunch[i][j].off();
      //   }
      // }
    }



  });


  potentiometer3.on("data", function() {

    console.log(this.value, this.raw);

    if(this.value <= 341) {
      new_pot = 0;
    }
    else if(this.value > 341 && this.value < 682 )
    {
      new_pot = 1;
    }
    else
    {
      new_pot = 2
    }

    if (pots[2] != new_pot) {
      pots[2] = new_pot;
      path[2] = players_paths[2][new_pot];
      console.log("herer");
      players[2].openFile(path[2]);

      if(new_pot == 0) {
        led7.on();
        led8.off();
        led9.off();
      }

      if(new_pot == 1) {
        led7.off();
        led8.on();
        led9.off();
      }

      if(new_pot == 2) {
        led7.off();
        led8.off();
        led9.on();
      }

      // for(var j=0; j<3; j++) {
      //   if(new_pot == j) {
      //     led_bunch[i][j].on();
      //   }
      //   else {
      //     led_bunch[i][j].off();
      //   }
      // }
    }



  });



  photoresistor1.on("data", function() {
    // console.log(this.value);
    console.log((this.value/1024)*100);
    // adjust_vol(i,(this.value/1024.0)*100);
    players[0].volume((this.value/400.0)*100);

  });

  photoresistor2.on("data", function() {
    // console.log(this.value);
    console.log((this.value/1024)*100);
    // adjust_vol(i,(this.value/1024.0)*100);
    players[1].volume((this.value/400.0)*100);

  });

  photoresistor3.on("data", function() {
    // console.log(this.value);
    console.log((this.value/1024)*100);
    // adjust_vol(i,(this.value/1024.0)*100);
    players[2].volume((this.value/400.0)*100);

  });


  pot_lucky = [potentiometer1,potentiometer2,potentiometer3];
  photo_lucky = [photoresistor1,photoresistor2,photoresistor3];

  // for(var i =0; i<3; i++) {


  // pot_lucky[i].on("data", function() {
    
  //   console.log(this.value, this.raw);
    
  //   if(this.value <= 341) {
  //     new_pot = 0;
  //   }
  //   else if(this.value > 341 && this.value < 682 )
  //   {
  //     new_pot = 1;
  //   }
  //   else
  //   {
  //     new_pot = 2
  //   }

  //   console.log(this.value);

  //   if (pots[i] != new_pot) {
  //     pots[i] = new_pot;
  //     path[i] = players_paths[i][new_pot];
  //     players[i].openFile(path[i]);

  //     for(var j=0; j<3; j++) {
  //       if(new_pot == j) {
  //         led_bunch[i][j].on();
  //       }
  //       else {
  //         led_bunch[i][j].off();
  //       }
  //     }
  //   }

  // });

  // photo_lucky[i].on("data", function() {
  //   // console.log(this.value);
  //   console.log((this.value/1024)*100);
  //   // adjust_vol(i,(this.value/1024.0)*100);
  //   // players[i].volume((this.value/1024.0)*100);

  // });


  //}

  // "data" get the current reading from the potentiometer
  // potentiometer1.on("data", function() {
  //   console.log(this.value, this.raw);
  //   new_pot = Math.round((this.value/1024)*3.0);
  //   if(pots[0]) != new_pot) {
  //     change_to(new_pot,track);
  //   }
  // });


  // photoresistor1.on("data", function() {
  //   console.log((this.value/1024.0)*100);
  //   adjust_vol(0,(this.value/1024.0)*100);
  // });


});