

window.onload = function(e) {
	var port = chrome.runtime.connect({name: "BAMGchannel"});
	var recognition = new webkitSpeechRecognition();
	setInterval(function() {
		recognition = new webkitSpeechRecognition();
	}, 55000);
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "ro-RO";
	recognition.start();
	var scroll_index = 0;
	var is_news_feed = 1;
	var is_searching = -1; // -1 cand nu are nicio legatura cu search; 
						   // 1 cand am zis search si urmeaza sa-i zic ce sa caute
						   // 0 cand am cautat si urmeaza sa-i dau comanda go
	var is_commenting = 0;
	var is_sharing = -1; // -1 cand nu are nicio legatura cu share; 
						 // 1 cand am zis share si urmeaza sa-i zic ce sa scrie la share
						 // 0 cand am scris mesajul si urmeaza sa-i dau comanda 'Share' din nou 
	var comment_box;

	var exit_status = false; // for pausing the recorder
	console.log("penis");
	recognition.onresult = function (event) {
    	for (var i = event.resultIndex; i < event.results.length; ++i) {
        	if (event.results[i].isFinal) {
        		if (is_searching != 1 && is_sharing != 1 && is_commenting != 1) {
	          		var command = event.results[i][0].transcript.toLowerCase().replace(/ /g,'');
	          	} else {
	          		var command = event.results[i][0].transcript.toLowerCase();
	          	}
	          	console.log(command);
	          	if (exit_status == true && command != "start") {
	          		return;
	          	}
	          	else {
	          		exit_status = false;
	          	}
	          	switch (command) {
	          		case "facebook":
	          			location.href='https://www.facebook.com';
	          			is_news_feed = 1;
	          			break;
	          		case "download":
	          		case "braun":
	          		case "down":
	          			port.postMessage({command : "Down"});
	          			var post = $(".mainWrapper").get(scroll_index);
	          			scroll_index++;
	          			console.log(post);
	          			$(window).scrollTo(post, {offset:-50, duration: 750});
	          			break;
	          		case "op":
	          		case "up":
	          			port.postMessage({command : "Up"});
	          			scroll_index--;
	          			if (scroll_index >= 0) {
	          				var post = $(".mainWrapper").get(scroll_index-1);
	          				$(window).scrollTo(post, {offset:-50, duration: 750});
	          				console.log(post);
	          			}
	          			else {
	          				scroll_index = 0;
	          			}
	          			break;
	          		case "like":
	          			port.postMessage({command : "Like"});
	          			if (is_news_feed == 1) {	
	          				var post = $(".mainWrapper").get(scroll_index-1);
	          				console.log(post);
	          				$(post).find('.UFILikeLink').get(0).click();
	          			} else {
	          				$(document).find('.UFILikeLink').get(0).click();
	          			}
	          			break;
	          		case "comment":
	          			port.postMessage({command : "Comment"});
	          			if (is_news_feed == 1) {
	          				var post = $(".mainWrapper").get(scroll_index-1);
	          				$(post).find('.uiLinkButton').get(0).click();
	          				comment_box = $(post).find("textarea").get(0);
	          				console.log(comment_box);
	          				comment_box.click();
	          				is_commenting = 1;
	          			}
	          			break;
	          		case "share":
	          			port.postMessage({command : "Share"});
	          			if (is_news_feed == 1) {
	          				if (is_sharing == -1) {	
	          					var post = $(".mainWrapper").get(scroll_index-1);
	          					$(post).find('.share_action_link').get(0).click();
	          					is_sharing = 1;
	          				} else if (is_sharing == 0) {
	          					document.getElementsByClassName("_s")[0].getElementsByTagName("button")[2].click();
	          					is_sharing = 0;
	          				}
	          			}
	          			break;
	          		case "loom":
	          		case "zoom":
	          			port.postMessage({command : "Zoom"});
	          			is_news_feed = 0;
	          			console.log($(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(1));
	          			$(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(0).click();
	          			break;          			
	          		case "back":
	          			port.postMessage({command : "Back"});
	          			is_news_feed = 0;
	          			$(document).find('.snowliftPager').get(0).click();
	          			break;
	          		case "next":
	          			port.postMessage({command : "Next"});
	          			is_news_feed = 0;
	          			$(document).find('.snowliftPager').get(1).click();
	          			break;
	          		case "profile":
	          			port.postMessage({command : "Profile"});
	          			is_news_feed = 0;
	          			location.href = $(document).find('div.mainWrapper').eq(scroll_index-1).find('div a:first').attr('href');
	          			break;
	          		case "photos":
	          			port.postMessage({command : "Photos"});
	          			is_news_feed = 0;
	          			location.href = location.href.split('?')[0]+'/photos';
	          			break;
	          		case "notifications":
	          			port.postMessage({command : "Notifications"});
	          			location.href = "https://www.facebook.com/notifications";
	          			break;
	          		case "messages":
	          			port.postMessage({command : "Messages"});
	          			is_news_feed = 0;
	          			location.href = "https://www.facebook.com/messages";
	          			break;
	          		case "friendrequest":
	          			port.postMessage({command : "Friend requests"});
	          			is_news_feed = 0;
	          			location.href = "https://www.facebook.com/friends/requests";
	          			break;
	          		case "sarci":
	          		case "search":
	          			port.postMessage({command : "Search"});
	          			is_news_feed = 0;
			          	is_searching = 1;
			          	continue;
			        case "go":
			        	port.postMessage({command : "Go"});
			        	is_news_feed = 0;
			        	if (is_searching == 0) {
	          				console.log($(document).find("div.instant_search_title a")[0]);
	          				$(document).find("div.instant_search_title a")[0].click();
	          				break;
	          			}
	          		case "cancel":
	          			port.postMessage({command : "Cancel"});
	          			is_searching = -1;
	          			is_commenting = 0;
	          			break;
			        case "exit":
			        	port.postMessage({command : "Exit, recording will now stop"});
			        	// recognition.stop();
			        	exit_status = true;
			        	break;
			        case "resume":
			        case "start":
			        	port.postMessage({command : "Starting to record"});
			        	exit_status = false;
			        	break;
	          		default:
	          			port.postMessage({command : "Penis, ia mai spune o data!"})
	          			console.log("default");
	          			// begin if is_searching
          				if (is_searching == 1) {
	          				$(".inputtext").get(0).click();
	          				$(".inputtext").get(0).value = command;
	          				console.log($(".inputtext").get(0).value);
	          				$("button").get(0).click();
		          			is_searching = 0;    				
	          			} // end if is_searching
	          			// begin if is_commenting
	          			if (is_commenting == 1) {
	          				comment_box.value = command;
	          				is_commenting = 0;
	          				//$(document).find(".commentable_item").get(0).submit();
	          			} // end if is_commenting
	          			// begin if is_sharing
	          			if (is_sharing == 1) {
	          				var tmp = document.getElementsByClassName("_s")[0].getElementsByTagName("textarea")[0];
	          				tmp.click();
	          				tmp.value = command;
	          				is_sharing = 0;
	          			} // end if is_sharing
	          	}
        	}
   	 	}
	}	
}
