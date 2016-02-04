var express = require('express');
var jsdom = require('jsdom');
var fs = require('fs');

var app = express();
app.use("/", express.static(__dirname+'/http/'));

var server = app.listen(5000);

jsdom.defaultDocumentFeatures = {
    FetchExternalResources   : ['link']
};

var vcon = jsdom.createVirtualConsole();
vcon.sendTo(console); 



var html = fs.readFileSync(__dirname+'/http/index.html', 'utf8');

var window = jsdom.jsdom(html, {
    virtualConsole: vcon
}).defaultView;

window.addEventListener('load', function () {
    var el = window.document.querySelector('p');

    console.log("color: " + window.getComputedStyle(el).fontColor);
    console.log("weight: " + window.getComputedStyle(el).fontWeight);

});