"use strict";
var args = require('system').args;
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = args[1]+".json";
var pageResponses = {};
var url = args[2];
var id_client = args[4];

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
})

page.open(url, function(status) {

    if ( status === "success" ) {
        
        console.log("entrou");
        
        page.viewportSize = { width: 1920, height: 1080 };
        
        var index = 3000;
        
        var interval = setInterval(function () {

            if(index > 30000){

                var regex = /(https?:\/\/www\.facebook\.com\/profile\.php\?id=([\d]+)|https?:\/\/www\.facebook\.com\/([^\?]+))/g;

                var lista = page.evaluate( function(regex, id_client) {

                    var listFinal  = Array();
                    var arrSerach  = document.getElementsByClassName('_32mo');

                    Array.from(arrSerach).forEach(function(el){ 
                        var matches, urlUser = "";
                        while (matches = regex.exec(el.href)) {
                            urlUser =  matches[2] ? matches[2] : matches[3];
                        }
                        listFinal.push({id_client:id_client, id_fb:urlUser, nome:el.innerText});
                    })
                    
                    return listFinal;

                }, regex, id_client);

                if(lista.length === 0){
                    // o login caiu
                    console.log("#status:false#");
                } else {
                    console.log("#status:true#");
                }
                console.log("#object:"+JSON.stringify(lista)+"#");
                clearInterval(interval);
                page.render("last_print-"+id_client+".png");
                phantom.exit();

            } else {
                page.scrollPosition = {
                    top: index,
                    left: 0
                };
                index += 3000;
            }

        }, 4000); 
    }
});

