'use strict';

  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({state: 'on'}, function(){
    	console.log('now ON');
    });
    chrome.storage.sync.set({showCamera: true}, function() {
    	console.log('camera now on');
    })
  });

