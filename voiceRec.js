

window.onload = function(e) {
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
	console.log("penis");
	recognition.onresult = function (event) {
    	for (var i = event.resultIndex; i < event.results.length; ++i) {
        	if (event.results[i].isFinal) {
        		if (is_searching != 1) {
	          		var command = event.results[i][0].transcript.toLowerCase().replace(/ /g,'');
	          	} else {
	          		var command = event.results[i][0].transcript.toLowerCase();
	          	}
	          	console.log(command);
	          	switch (command) {
	          		case "facebook":
	          			location.href='https://www.facebook.com';
	          			is_news_feed = 1;
	          			break;
	          		case "down":
	          			var post = $(".mainWrapper").get(scroll_index);
	          			scroll_index++;
	          			console.log(post);
	          			$(window).scrollTo(post, {offset:-50, duration: 750});
	          			break;
	          		case "up":
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
	          		case "op":
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
	          			if (is_news_feed == 1) {	
	          				var post = $(".mainWrapper").get(scroll_index-1);
	          				console.log(post);
	          				$(post).find('.UFILikeLink').get(0).click();
	          			} else {
	          				$(document).find('.UFILikeLink').get(0).click();
	          			}
	          				break;
	          		case "zoom":
	          			is_news_feed = 0;
	          			console.log($(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(1));
	          			$(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(0).click();
	          			break;
	          		case "loom":
	          			is_news_feed = 0;
	          			console.log($(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(1));
	          			$(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(0).click();
	          			break;	          			
	          		case "back":
	          			is_news_feed = 0;
	          			$(document).find('.snowliftPager').get(0).click();
	          			break;
	          		case "next":
	          			is_news_feed = 0;
	          			$(document).find('.snowliftPager').get(1).click();
	          			break;
	          		case "profile":
	          			is_news_feed = 0;
	          			location.href = $(document).find('div.mainWrapper').eq(scroll_index-1).find('div a:first').attr('href');
	          			break;
	          		case "photos":
	          			is_news_feed = 0;
	          			location.href = location.href.split('?')[0]+'/photos';
	          			break;
	          		case "notifications":
	          			location.href = "https://www.facebook.com/notifications";
	          			break;
	          		case "messages":
	          			location.href = "https://www.facebook.com/messages";
	          			break;
	          		case "friendrequest":
	          			location.href = "https://www.facebook.com/friends/requests";
	          			break;
	          		case "search":
			          	is_searching = 1;
			          	continue;
			        case "sarci":
			          	is_searching = 1;
			          	continue;
			        case "go":
			        	if (is_searching == 0) {
	          				console.log($(document).find("div.instant_search_title a")[0]);
	          				$(document).find("div.instant_search_title a")[0].click();
	          				break;
	          			}
			        case "stop":
			        	recognition.stop();
	          		default:
	          			console.log("default");
	          			if (is_searching == 1) {
	          				$("input").get(0).value = command;
          					$("button").get(0).click();
		          			is_searching = 0;    				
	          			}
	          	}
        	}
   	 	}
	}	
}
