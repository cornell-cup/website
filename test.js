var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = 8080;

app.use(express.static('build'));

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
