  //let changeColor = document.getElementById('changeColor');
  let toggleOn = document.getElementById('toggleOn');
  let toggleCam = document.getElementById('toggleCamera');

  console.log('hi');
  toggleOn.addEventListener('change',function () {
  	if(this.checked) {
  		chrome.storage.sync.set({gazeOn: true}, function() {
     		 console.log('Turned on');
    	})
  	} else {
  		chrome.storage.sync.set({gazeOn: false}, function() {
     		 console.log('Turned off');
    	})
  	}
    
  });

  /*chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };*/