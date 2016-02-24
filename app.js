var app = require('express')(),
	crypto = require('crypto'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	compression = require('compression'),
	serveStatic = require('serve-static'),
	cookieParser = require('cookie-parser');

process.on('uncaughtException', function(err) {
	console.log((new Date()) + err + '\r\n');
	console.log((new Date()) + 'Error stack: ' + err.stack + '\r\n');
});
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));
app.use(bodyParser.json({
	limit: '50mb'
}));
app.get('/login/:user/:pwd', function(req, res) {
	var hash = crypto.createHash('sha256').update(req.params.user.toLowerCase() + req.params.pwd.toLowerCase() + '*C&4GF087g*eGSD8FG802PG213-99AS-F0SAIGDI9h*gf)4{sd:,.VXVP2I023R').digest('hex');
	res.send(hash);
});
app.use(serveStatic(__dirname + '/pub'));
//app.use(favicon(__dirname + "/pub/img/favicon.ico"));
app.listen(8088, function() {
	console.log("Started");
})