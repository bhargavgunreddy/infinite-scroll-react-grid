var expressServer = require('express');
var app = expressServer();

app.set('port', process.env.PORT || 8080);
app.set('url', process.env.IP || 'localhost');

app.use('/', function(err, res){
	res.sendFile(__dirname+'/build/index.html');
});

app.listen(app.get('port'), app.get('url'));
