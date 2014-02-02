var page = require('webpage').create();
url = 'https://www.facebook.com';
email = "bamg.vn@gmail.com";
pass = "contenttest123";
var done_loading = false;

page.open(url, function(status) {
    page.evaluate( function() {
        document.getElementById("email").value = "bamg.vn@gmail.com";
        document.getElementById("pass").value = "contenttest123";
        document.getElementById("login_form").submit();
    });
    page.onLoadFinished = function(status) {
        done_loading = true;
    }

    setInterval(function() {
        if (done_loading) {
            var test;
            page.injectJs("jQuery.js");
            //////////////// DOWN 
            test = page.evaluate( function() {
            	return $(".clearfix._5pcr.userContentWrapper").get(0);
            });
            if (test == null) {
            	console.log('down command does not work');
            	phantom.exit(1);
            }

            //////////////// LIKE
            test = page.evaluate( function() {
            	var post = $(".clearfix._5pcr.userContentWrapper").get(0);
            	return $(post).find('.UFILikeLink').get(0);
            });
            if (test == null) {
            	console.log('like command does not work');
            	phantom.exit(2);
            }

            //////////////// PROFILE
            test = page.evaluate( function() {
            	return $(document).find('div.clearfix._5pcr.userContentWrapper').eq(0).find('div a:first').attr('href');
            });
            if (test == null) {
            	console.log('profile command does not work');
            	phantom.exit(3);
            }

            //////////////// SHARE
            test = page.evaluate( function() {
            	return $(document).find('.share_action_link').get(0);
            });
            if (test == null) {
            	console.log('share command does not work');
            	phantom.exit(4);
            }

            console.log("everything is fine")
            phantom.exit();
        }
    // interval in care se incarca pagina
    }, 100);

});
