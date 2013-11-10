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



chrome.runtime.onConnect.addListener(function(port) {
	var portita = chrome.runtime.connect({name: "secondChannel"});
	console.assert(port.name == "BAMGchannel");
	port.onMessage.addListener(function(msg) {
		if (msg.command == "down") {
      			//port.postMessage({ok : "pizda"});
			portita.postMessage({command: "down"});


    		}
	});
});


// Ensure the current selected tab is set up.

