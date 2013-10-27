

// window.onload = function(e) {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en";
	recognition.start();
	var scroll_index = 0;
	var is_news_feed = 1;
	recognition.onresult = function (event) {
    	for (var i = event.resultIndex; i < event.results.length; ++i) {
        	if (event.results[i].isFinal) {
	          	var command = event.results[i][0].transcript.toLowerCase().replace(/ /g,'');
	          	console.log(command);
	          	//console.log($(".mainWrapper").get(3));
	          	switch (command) {
	          		case "facebook":
	          			location.href='https://www.facebook.com';
	          			is_news_feed = 1;
	          			break;
	          		case "down":
	          			var post = $(".mainWrapper").get(scroll_index);
	          			scroll_index++;
	          			console.log(post);
	          			$(window).scrollTo(post);
	          			break;
	          		case "up":
	          			scroll_index--;
	          			if (scroll_index >= 0) {
	          				var post = $(".mainWrapper").get(scroll_index);
	          				$(window).scrollTo(post);
	          				console.log(post);
	          			}
	          			else {
	          				scroll_index = 0;
	          			}
	          			break;
	          		case "op":
	          			scroll_index--;
	          			if (scroll_index >= 0) {
	          				var post = $(".mainWrapper").get(scroll_index);
	          				$(window).scrollTo(post);
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
	          		default:
	          			console.log("default");
	          	}
        	}
   	 	}
	}	
// }