var j5 = require("johnny-five");
var http = require('http');

var myBoard, greenLed, redLed, blueLed;

myBoard = new j5.Board();

myBoard.on('ready', function() {
  greenLed = new j5.Led(13);
  redLed = new j5.Led(12);
  blueLed = new j5.Led(11);
  
  checkPage('www.cnn.com');

  this.repl.inject({
		blueLed: blueLed,
		redLed: redLed,
		greenLed: greenLed,
		checkPage: checkPage
  });
});

function checkPage(url) {
	turnAllLedsOff();
	
	var options = {
    host: url,
    port: 80,
    method: 'GET'
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
  
  req.on('error', function(){
  	turnAllLedsOff();
  	redLed.on();
  	console.log('Uh oh, something went wrong.');
  })
  
  req.write('data\n');   //Write some data into request
  req.write('data\n');
  req.end();
}

function turnAllLedsOff() {
	blueLed.off();
	greenLed.off();
	redLed.off();
}
