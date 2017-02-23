var expressServer = require('express');
var app = expressServer();


app.use('/', function(err, res){
	res.sendFile(__dirname+'/build/index.html');
});

app.listen(process.env.PORT, process.env.IP);
