window.onload = function (e) {

    var rec_language, rec_start;
    chrome.runtime.sendMessage({
        local_storage: "get"
    }, function (response) {
        rec_language = response.rec_language;
        if (response.rec_start == "0") {
            // start when facebook loads
            exit_status = true;
        } else {
            exit_status = false;
        }
    });

    setTimeout(function () {
        var port = chrome.runtime.connect({
            name: "BAMGchannel"
        });
        var recognition = new webkitSpeechRecognition();
        setInterval(function () {
            recognition = new webkitSpeechRecognition();
        }, 15000);
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.lang = rec_language;
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
        var comment_box_input;


        console.log("The recording has begun");
        recognition.onresult = function (event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    if (is_searching != 1 && is_sharing != 1 && is_commenting != 1) {
                        var raw_command = event.results[i][0].transcript;
                        var command = event.results[i][0].transcript.toLowerCase().replace(/ /g, '');
                    } else {
                        var command = event.results[i][0].transcript.toLowerCase();
                    }
                    console.log(command);
                    if (exit_status == true && command != "start" && command != "resume" && command != "star") {
                        return;
                    } else {
                        exit_status = false;
                    }
                    switch (command) {
                    case "back":
                        port.postMessage({
                            command: "Back"
                        });
                        is_news_feed = 0;
                        $(document).find('.snowliftPager').get(0).click();
                        break;

                    case "cancel":
                        port.postMessage({
                            command: "Cancel"
                        });
                        is_searching = -1;
                        is_commenting = 0;
                        break;

                    case "comment":
                        port.postMessage({
                            command: "Comment"
                        });
                        if (document.location.href == "https://www.facebook.com/") {
                            var post = $(".clearfix._5pcr.userContentWrapper").get(scroll_index - 1);
                            $(post).find('.uiLinkButton').get(0).click();
                            /////////
                            comment_box_input = $(post).find('.hiddenInput').get(0);
                            comment_box = $(post).find("textarea").get(0);
                            console.log(comment_box);
                            comment_box.click();
                            is_commenting = 1;
                        }
                        break;

                    case "download":
                    case "braun":
                    case "down":
                        port.postMessage({
                            command: "Down"
                        });
                        if (document.location.href == "https://www.facebook.com/") {
                            ana_banana = true;
                        }
                        if (document.location.href == "https://www.facebook.com/") {
                            var post = $(".clearfix._5pcr.userContentWrapper").get(scroll_index);
                            scroll_index++;
                            console.log(post);
                            //console.log(post);
                            $(window).scrollTo(post, {
                                offset: -50,
                                duration: 750
                            });
                        } else {
                            window.scrollBy(0, 500);
                        }
                        break;

                    case "pause":
                    case "exit":
                        port.postMessage({
                            command: "Exit, recording will now stop"
                        });
                        exit_status = true;
                        break;

                    case "facebook":
                        location.href = 'https://www.facebook.com';
                        is_news_feed = 1;
                        break;

                    case "friendrequest":
                        port.postMessage({
                            command: "Friend requests"
                        });
                        is_news_feed = 0;
                        location.href = "https://www.facebook.com/friends/requests";
                        break;

                    case "ga":
                    case "gau":
                    case "go":
                        port.postMessage({
                            command: "Go"
                        });
                        is_news_feed = 0;
                        if (is_searching == 0) {
                            console.log($(document).find("div.instant_search_title a")[0]);
                            $(document).find("div.instant_search_title a")[0].click();
                        }
                        break;

                    case "like":
                        port.postMessage({
                            command: "Like"
                        });
                        if (is_news_feed == 1) {
                            var post = $(".clearfix._5pcr.userContentWrapper").get(scroll_index - 1);
                            console.log(post);
                            $(post).find('.UFILikeLink').get(0).click();
                        } else {
                            $(document).find('.UFILikeLink').get(0).click();
                        }
                        break;

                    case "message":
                    case "messenger":
                    case "messages":
                        port.postMessage({
                            command: "Messages"
                        });
                        is_news_feed = 0;
                        user = location.href.split(".com/")[1].split('?')[0];
                        location.href = "https://www.facebook.com/messages/" + user;
                        break;

                    case "next":
                        port.postMessage({
                            command: "Next"
                        });
                        is_news_feed = 0;
                        $(document).find('.snowliftPager').get(1).click();
                        break;

                    case "notification":
                    case "notifications":
                        port.postMessage({
                            command: "Notifications"
                        });
                        location.href = "https://www.facebook.com/notifications";
                        break;

                    case "profile":
                        port.postMessage({
                            command: "Profile"
                        });
                        is_news_feed = 0;
                        location.href = $(document).find('div.clearfix _5pcr userContentWrapper').eq(scroll_index - 1).find('div a:first').attr('href');
                        break;

                    case "photos":
                        port.postMessage({
                            command: "Photos"
                        });
                        is_news_feed = 0;
                        location.href = location.href.split('?')[0] + '/photos';
                        break;

                    case "above":
                    case "op":
                    case "upc":
                    case "up":
                        if (document.location.href == "https://www.facebook.com/") {
                            port.postMessage({
                                command: "Up"
                            });
                            scroll_index--;
                            if (scroll_index >= 0) {
                                var post = $(".clearfix._5pcr.userContentWrapper").get(scroll_index - 1);
                                $(window).scrollTo(post, {
                                    offset: -50,
                                    duration: 750
                                });
                                console.log(post);
                            } else {
                                scroll_index = 0;
                            }
                        } else {
                            window.scrollBy(0, -500);
                        }
                        break;

                    case "resume":
                    case "start":
                        port.postMessage({
                            command: "Starting to record"
                        });
                        exit_status = false;
                        break;

                    case "sarci":
                    case "search":
                        port.postMessage({
                            command: "Search"
                        });
                        is_news_feed = 0;
                        is_searching = 1;
                        break;

                    case "cher":
                    case "share":
                        port.postMessage({
                            command: "Share"
                        });
                        if (is_news_feed == 1) {
                            if (is_sharing == -1) {
                                var post = $(".clearfix._5pcr.userContentWrapper").get(scroll_index - 1);
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
                        port.postMessage({
                            command: "Zoom"
                        });
                        is_news_feed = 0;
                        console.log($(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(1));
                        $(document).find('a.uiMediaThumb._6i9.uiMediaThumbMedium').get(0).click();
                        break;

                    default:
                        port.postMessage({
                            command: "Sorry, I didn't get that."
                        })
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
                        if (location.href.split('messages').length == 2) {
                            // we're in messages
                            $(document).find("textarea").get(0).value += raw_command + " ";
                            // TODO
                            // trebuie imbunatatita partea asta
                            $(".uiButtonConfirm:nth-child(2)")[1].control.click();
                        }
                        if (is_commenting == 1) {
                            comment_box.value = command;
                            is_commenting = 0;
                            var e = jQuery.Event("keydown");
                            e.which = 13;
                            comment_box_input.trigger(e);
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
    }, 1000);
}
