"use strict";
var args = require('system').args;
var webPage = require('webpage');
var page = webPage.create();

page.open("https://www.google.com.br", function(status) {

    setTimeout(function(){
        console.log("#status:true#");
        console.log("#object:{}#");
        phantom.exit();
    }, 5000);   

})