var j5 = require("johnny-five");
var http = require('http');

var myBoard, greenLed, redLed, blueLed;

myBoard = new j5.Board();

myBoard.on("ready", function() {

  greenLed = new j5.Led(13);
  redLed = new j5.Led(12);
  blueLed = new j5.Led(11);
  
  var options = {
    host: 'www.google.com',
    port: 80,
    method: 'GET',
    path:'/foo'
  };
  
  blueLed.strobe(800);
  
  var req = http.request(options, function(res){
    console.log(res.statusCode);
    
    if(res.statusCode < 400) {
      greenLed.on();    
    } else {
      redLed.on();
    };
    
    blueLed.stop();
    blueLed.off();  
  });
  
  req.write('data\n');   //Write some data into request
  req.write('data\n');
  req.end();

  this.repl.inject({
      led: blueLed
  });
});
