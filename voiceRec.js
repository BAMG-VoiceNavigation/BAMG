

// window.onload = function(e) {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en";
	recognition.start();
	var scroll_index = 0;
	recognition.onresult = function (event) {
    	for (var i = event.resultIndex; i < event.results.length; ++i) {
        	if (event.results[i].isFinal) {
	          	var command = event.results[i][0].transcript.toLowerCase().replace(/ /g,'');
	          	console.log(command);
	          	//console.log($(".mainWrapper").get(3));
	          	switch (command) {
	          		case "facebook":
	          			location.href='https://www.facebook.com';
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
	          			if (location.href == 'https://www.facebook.com') {	
	          				var post = $(".mainWrapper").get(scroll_index-1);
	          				console.log($(post).find('.UFILikeLink').get(0));
	          				$(post).find('.UFILikeLink').get(0).click();
	          			} else {
	          				$(document).find('.UFILikeLink').get(0).click();
	          			}
	          				break;
	          		case "zoom":
	          			console.log($(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(1));
	          			$(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(0).click();
	          			break;
	          		case "loom":
	          			console.log($(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(1));
	          			$(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(0).click();
	          			break;	          			
	          		case "back":
	          			$(document).find('.snowliftPager').get(0).click();
	          			break;
	          		case "next":
	          			$(document).find('.snowliftPager').get(1).click();
	          			break;
	          		case "profile":
	          			location.href = $(document).find('div.mainWrapper').eq(scroll_index-1).find('div a:first').attr('href');
	          			break;
	          		case "photos":
	          			location.href = location.href.split('?')[0]+'/photos';
	          			break;
	          		default:
	          			console.log("default");
	          	}
        	}
   	 	}
	}	
// }