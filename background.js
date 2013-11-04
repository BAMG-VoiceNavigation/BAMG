
function updateSelected(tabId) {
    chrome.pageAction.setTitle({tabId:tabId, title:"ana are mere"});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {

});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});


function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "sphinxChannel");
	port.onMessage.addListener(function(msg) {
		if (msg.state == "ready")
			port.postMessage({color:get_random_color()});
	});
});


// Ensure the current selected tab is set up.

