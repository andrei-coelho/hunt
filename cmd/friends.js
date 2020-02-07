"use strict";
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = "../json/cookie/cookiejar.json";
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

page.open("https://www.facebook.com/marciane.silva.7543/friends", function(status) {

    if ( status === "success" ) {

        page.viewportSize = { width: 1920, height: 1080 };
        console.log("entrou");

        var index = 3000;
        var interval = setInterval(function () {

            if(index > 20000){

                console.log('carregamento...');

                var regex = /(https?:\/\/www\.facebook\.com\/profile\.php\?id=([\d]+)|https?:\/\/www\.facebook\.com\/([^\?]+))/g;

                var lista = page.evaluate( function(regex) {

                    var listFriends = document.getElementsByClassName('_698');
                    var listFinal = Array();

                    Array.from(listFriends).forEach( function(divFriend) {

                        var valueUser = divFriend.querySelector('.fsl a');
                        var matches, urlUser = "";

                        while (matches = regex.exec(valueUser.href)) {
                            urlUser =  matches[2] ? matches[2] : matches[3];
                        }

                        listFinal.push({url:urlUser, nome:valueUser.innerText});

                    });

                    return listFinal;

                }, regex);

                console.log(lista.length);
                clearInterval(interval);
                phantom.exit();

            } else {
                page.scrollPosition = {
                    top: index,
                    left: 0
                };
                console.log("Listando...");
                index += 3000;
            }

        }, 4000);

   }
});
