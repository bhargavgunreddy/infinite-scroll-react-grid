// var expressServer = require('express');
// var app = expressServer();

// app.set('port', process.env.PORT || 8080);
// app.set('url', process.env.IP || 'localhost');

// app.use('/', function(err, res){
// 	res.sendFile(__dirname+'/build/index.html');
// });

// app.listen(app.get('port'), app.get('url'));

var webpack = require('webpack');

var config = require("./webpack.config.js");

var url = process.env.IP || "http://localhost";
var portNum = process.env.PORT || 8080;

config.entry.app.unshift("webpack-dev-server/client?"+ url +":" + portNum +"/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler);
server.listen(portNum);