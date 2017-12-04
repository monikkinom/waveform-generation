
SqrOsc s => dac;

Std.atoi(me.arg(0)) => int id;
Std.atof(me.arg(1)) => float gain;
id => s.freq;
gain => s.gain;


while(true) {
    100::ms => now;    
}
