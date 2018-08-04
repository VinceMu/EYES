/* 

	Run webgazer

*/
appendLoop = '';
eyeData = [];
runs = 0;

setTimeout(function (){
	initGazer();
},50);

function initGazer() {
	console.log(webgazer);
	var compatible = webgazer.detectCompatibility();
	console.log(compatible?'compatible':'not compatible');
	if (compatible) {
		/*webgazer.begin();
		console.log(videoElement);
		var video = document.getElementById('')
		videoElement.style.display="block";
		document.body.appendChild(videoElement);
		//webgazer.showPreditionPoints();
		seteInterval(appendData,100);
		//setInterval(sendData,2000)
		*/
	//start the webgazer tracker
    	webgazer.setRegression('ridge') /* currently must set regression and tracker */
	        .setTracker('clmtrackr')
	        .setGazeListener(function(data, clock) {
	          //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
	          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
	        })
	        .begin()
	        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */



        function checkIfReady() {
	        if (webgazer.isReady()) {
	        	console.log('ready');
	            setup();
	        } else {
	            setTimeout(checkIfReady, 100);
	        }
	    }
	    setTimeout(checkIfReady,100);
	}




}


//Set up the webgazer video feedback.
var setup = function() {
	var width = 300;
    var height = 230;
    var topDist = '0px';
    var leftDist = '0px';
    //Set up video variable to store the camera feedback
    var video = document.getElementById('webgazerVideoFeed');

    //Position the camera feedback to the top left corner.
    video.style.display = 'block';
    video.style.position = 'fixed';
    video.style.top = topDist;
    video.style.left = leftDist;

    //Set up the video feedback box size
    video.width = width;
    video.height = height;
    video.style.margin = '0px';
    video.style.background = '#222222';
    webgazer.params.imgWidth = width;
    webgazer.params.imgHeight = height;

    //Set up the main canvas. The main canvas is used to calibrate the webgazer.
    var overlay = document.createElement('canvas');
    overlay.id = 'overlay';

    //Setup the size of canvas
    overlay.style.position = 'fixed';
    overlay.width = width;
    overlay.height = height;
    overlay.style.top = topDist;
    overlay.style.left = leftDist;
    overlay.style.margin = '0px';

    //Draw the face overlay on the camera video feedback
    var faceOverlay = document.createElement('face_overlay');
    faceOverlay.id = 'faceOverlay';
    faceOverlay.style.position = 'fixed';
    faceOverlay.style.top = '59px';
    faceOverlay.style.left = '107px';
    faceOverlay.style.border = 'solid';

    document.body.appendChild(overlay);
    document.body.appendChild(faceOverlay);

/*
    var canvas = document.getElementById("plotting_canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
*/
    var cl = webgazer.getTracker().clm;

    //This function draw the face of the user frame.
    function drawLoop() {
        requestAnimFrame(drawLoop);
        overlay.getContext('2d').clearRect(0,0,width,height);
        if (cl.getCurrentPosition()) {
            cl.draw(overlay);
        }
    }
    drawLoop();
    console.log(width,height);
   	appendLoop = setInterval(appendData,100);

 }

 function stopAppending() {
 	clearInterval(appendLoop);
 	console.log(eyeData);
 }

function appendData() {
	console.log('appending');
	runs++;
	if(runs >30) {
		stopAppending();
		postData();
		eyeData = [];
	}
	var prediction = webgazer.getCurrentPrediction();
	if(prediction) {
		point = {
			'x':prediction.x, 
			'y':prediction.y, 
			'timestamp':new Date(),
			'windowWidth':window.innerWidth,
			'windowHeight':window.innerHeight,
		};
		console.log(runs);
		eyeData.push(point);
	}
}

function postData() {
	var url = 'http://127.0.0.1:5000/postData'
	var postMsg = new Object();
	postMsg.data = eyeData;
	postMsg.url = window.location.origin;
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(postMsg),
	});



}






