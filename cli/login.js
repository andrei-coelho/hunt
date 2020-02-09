
var args = require('system').args;

var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = args[1]+".json";
var pageResponses = {};
var url = args[2];
var email = args[5];
var pass = args[6];

phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

page.customHeaders = {'Accept-Language' : args[4]};
page.settings.userAgent = args[3];
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;

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

page.open(url, function(status) {
    
    if ( status === "success" ) {
        page.render("parte1.jpg");
        console.log("entrou");
        if(!login){
            page.evaluate(function(email, pass) {
                document.querySelector("input[name='email']").value = email;
                document.querySelector("input[name='pass']").value = pass;
                document.querySelector("#login_form").submit();
            }, email, pass);
            setTimeout(function(){
                page.render("parte2.jpg");
                var test1 = page.evaluate(function(){
                    return document.querySelector("form[action='/search/top/']")
                })
                if(test1) console.log(true);
                else console.log(false);
                phantom.exit();
            }, 5000);
        } 
        else {
            var test1 = page.evaluate(function(){
                return document.querySelector("form[action='/search/top/']")
            })
            var other = false;
            if(test1){
                console.log(true);
            } 
            else {
                other = true;
                page.evaluate(function(email, pass) {
                    document.querySelector("input[name='email']").value = email;
                    document.querySelector("input[name='pass']").value = pass;
                    document.querySelector("#login_form").submit();
                }, email, pass);
            }
            page.evaluate(function() {
                document.querySelector('._lp3').style.cssText = "display:none";
            })
            setTimeout(function(){
            
                page.render("parte5.jpg");
                if(other){
                    var test2 = page.evaluate(function(){
                        return document.querySelector("form[action='/search/top/']")
                    })
                    if(test2) console.log(true);
                    else console.log(false);
                }
                phantom.exit();
            }, 10000);
        }

    }

})



