
var args = require('system').args;

var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = args[1]+".json";
var pageResponses = {};
var url = args[2];

phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

page.customHeaders = {'Accept-Language' : args[4]};
page.settings.userAgent = args[3];
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;

page.onResourceReceived = function(response) {
    pageResponses[response.url] = response.status;
    fs.write(CookieJar, JSON.stringify(phantom.cookies), "w");
};
Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
    phantom.addCookie(x);
})

page.open("https://www.facebook.com/search/people/?q=ricardo&epa=FILTERS&filters=eyJjaXR5Ijoie1wibmFtZVwiOlwidXNlcnNfbG9jYXRpb25cIixcImFyZ3NcIjpcIjExMjA0NzM5ODgxNDY5N1wifSJ9", function(status) {

    if ( status === "success" ) {
        console.log("entrou");
        
        page.viewportSize = { width: 1920, height: 1080 };
        page.render("test.png");
        var index = 3000;
        
        var interval = setInterval(function () {

            if(index > 30000){

                var regex = /(https?:\/\/www\.facebook\.com\/profile\.php\?id=([\d]+)|https?:\/\/www\.facebook\.com\/([^\?]+))/g;

                var lista = page.evaluate( function(regex) {

                    var listFinal  = Array();
                    var arrSerach  = document.getElementsByClassName('_32mo');

                    Array.from(arrSerach).forEach(function(el){ 
                        var matches, urlUser = "";
                        while (matches = regex.exec(el.href)) {
                            urlUser =  matches[2] ? matches[2] : matches[3];
                        }
                        listFinal.push({url:urlUser, nome:el.innerText});
                    })
                    
                    return listFinal;

                }, regex);

                if(lista.length === 0){
                    // o login caiu
                    console.log("false");
                } else {
                    console.log(JSON.stringify(lista));
                }

                clearInterval(interval);
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
