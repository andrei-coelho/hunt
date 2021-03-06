"use strict";
var args = require('system').args;
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = args[1]+".json";
var pageResponses = {};
var url = args[2];
var path = args[4]; // local em que será salvo as imagens

phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;
page.settings.userAgent = args[3];
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;

page.onResourceReceived = function(response) {
    pageResponses[response.url] = response.status;
    fs.write(CookieJar, JSON.stringify(phantom.cookies), "w");
};
Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
    phantom.addCookie(x);
});

page.open(url, function(status) {

    if ( status === "success" ) {

        page.viewportSize = { width: 1920, height: 1080 };
        
        var top = 0;
        var sBase = 0;

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

        var next = false;

        var interval = window.setInterval(function () {
            
            if(top > 15){

                console.log("#status:true#");
                window.clearInterval(interval);
                phantom.exit();

            } else {
            
                page.render(path + '\\facebook_page_'+top+'.png');
                top++;
                sBase = page.evaluate(function () { return document.body.scrollHeight; });

                if(next){
                    console.log("#status:true#");
                    window.clearInterval(interval);
                    phantom.exit();
                }

                page.scrollPosition = {
                    top: sBase,
                    left: 0
                };

                isFinish = page.evaluate(function() { return document.getElementsByClassName('sp_dPnsHOPzupp').length; })
                if(isFinish == 1) next = true;
            }

        }, 3000);

   } else {

       console.log("#status:false#");
       phantom.exit();
       
   }
});
