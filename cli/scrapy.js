"use strict";
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = "../json/cookies/cookiejar.json";
var pageResponses = {};


page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;


page.onResourceReceived = function(response) {
    pageResponses[response.url] = response.status;
    fs.write(CookieJar, JSON.stringify(phantom.cookies), "w");
};
if(fs.isFile(CookieJar)){
    Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
        phantom.addCookie(x);
    });
}

page.open("https://www.facebook.com/edinilson.leite.37", function(status) {

    if ( status === "success" ) {

        page.viewportSize = { width: 1920, height: 1080 };
        
        console.log("entrou");

        var top = 0;
        var sBase = 0;

        var interval = window.setInterval(function () {
            
            if(top > 15){

                window.clearInterval(interval);
                phantom.exit();

            } else {

                page.evaluate(function(){

                    var elsoptions = document.getElementsByClassName('_78bu');
                    var elscoments = document.getElementsByClassName('_3w53');
                    var elsheaders = document.getElementsByClassName('l_5t6lem8ia');
                    var leftx      = document.getElementsByClassName('_5ss8');

                    document.getElementById('fbProfileCover').style.cssText = "display:none;";
                    document.getElementById('bluebarRoot').style.cssText = "display:none;";
                    document.getElementById('profileEscapeHatchContentID').style.cssText = "display:none;";

                    Array.from(elsoptions).forEach(function (eloption) {
                        eloption.style.cssText = "display:none;";
                    });
                    Array.from(elscoments).forEach(function (elcoment) {
                        elcoment.style.cssText = "display:none;";
                    });
                    Array.from(elsheaders).forEach(function (elheader) {
                        elheader.style.cssText = "display:none;";
                    });
                    Array.from(leftx).forEach(function (left) {
                        left.style.cssText = "display:none;";
                    });

                })

                page.render('facebook_page_'+top+'.png');
                top++;
                sBase = page.evaluate(function () { return document.body.scrollHeight; });

                page.scrollPosition = {
                    top: sBase,
                    left: 0
                };
            }

        }, 5000);

   }
});
