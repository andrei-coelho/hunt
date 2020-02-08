
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

var login = false;

page.onResourceReceived = function(response) {
    pageResponses[response.url] = response.status;
    fs.write(CookieJar, JSON.stringify(phantom.cookies), "w");
};
if(fs.isFile(CookieJar)){
    Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
        phantom.addCookie(x);
    });
    login = true;
}

if(!login){
    page.evaluate(function() {
        document.querySelector("input[name='email']").value = "andreifcoelho@gmail.com";
        document.querySelector("input[name='pass']").value = "mushmush123";
        document.querySelector("#login_form").submit();
    });
}