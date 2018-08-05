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
	var compatible = webgazer.detectCompatibility();
	chrome.storage.sync.get('state', function(result) {
		console.log(result.state);
        var on = (result.state=='on');
        console.log(on);
		if (compatible&&on) {
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

					chrome.runtime.onMessage.addListener(
					function(request, sender, sendResponse) {
						console.log(sender.tab ?
						  "from a content script:" + sender.tab.url :
						  "from the extension");
						if (request.toggleCamera == false) {
							sendResponse({toggleCamera: false});
							console.log('off');
							document.getElementById('overlay').style.visibility='hidden';
							document.getElementById('faceOverlay').hidden=false;
							document.getElementById('webgazerVideoFeed').style.display='none';
						} else if (request.toggleCamera == true) {
							console.log('on');
							sendResponse({toggleCamera: true});
							document.getElementById('faceOverlay').style.visibility='visible';
							document.getElementById('webgazerVideoFeed').style.display='block';
							document.getElementById('overlay').hidden=true;
							setup();
						}

						if(request.state) {

						} else if (!request.state){
							//stopAppending();
						}
					});

		            setup();
		        } else {
		            setTimeout(checkIfReady, 100);
		        }
		    }
		    setTimeout(checkIfReady,100);
		}
    });
}
	var width = 300;
    var height = 230;
    var topDist = '0px';
    var leftDist = '0px';

//Set up the webgazer video feedback.
var setup = function() {

    //Set up video variable to store the camera feedback
    var video = document.getElementById('webgazerVideoFeed');


    console.log(showCamera);
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
    var showCamera;
    chrome.storage.sync.get('showCamera', function(result) {
    	var showCamera = result.showCamera;
		overlay.hidden = !showCamera;
    	faceOverlay.hidden = !showCamera;
	    video.style.display = showCamera?'block':'none';
    });
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
    if(appendLoop) stopAppending();
    setTimeout(appendLoop = setInterval(appendData,100),5000);

 }

 function stopAppending() {
 	clearInterval(appendLoop);
 	console.log(eyeData);
 }

function appendData() {
	console.log('appending');
	runs++;
	if(runs > 120) {
		stopAppending();
		postData();
		eyeData = [];
		runs=0;
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






