var tab_id;
function updateSelected(tabId) {
    chrome.pageAction.setTitle({tabId:tabId, title:"ana are mere"});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  tab_id = tabId;
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  tab_id = tabId;
});

var first_run = false;
if (!localStorage['ran_before']) {
  first_run = true;
  localStorage['ran_before'] = '1';
}

if (first_run)
{ window.open('index.html', '_blank');
}

chrome.runtime.onConnect.addListener(function(port) {
	var portita = chrome.runtime.connect({name: "PENISchannel"});
	console.assert(port.name == "BAMGchannel");
	port.onMessage.addListener(function(msg) {
		if (msg.command == "down") {
      			//port.postMessage({ok : "pizda"});
			portita.postMessage({command: "down"});


    		}
	});
});


// Ensure the current selected tab is set up.

