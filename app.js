var fs = require('fs'),
	im = require('imagemagick'),
	app = require('express')(),
	crypto = require('crypto'),
	multer = require('multer'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	upload = multer({
		dest: 'tmp/'
	}),
	favicon = require('serve-favicon'),
	adminid = require('./adminid.js')(),
	bodyParser = require('body-parser'),
	compression = require('compression'),
	serveStatic = require('serve-static'),
	cookieParser = require('cookie-parser'),
	multipart = require('connect-multiparty');

var Video = mongoose.model('Video', {
	'bgimage': String,
	'bgvideo': String,
	'fullvideo': String,
	'headertext': String,
	'descriptiontext': String
});

var Info = mongoose.model('Info', {
	'mail': String,
	'phone': String
});

process.on('uncaughtException', function(err) {
	console.log((new Date()) + err + '\r\n');
	console.log((new Date()) + 'Error stack: ' + err.stack + '\r\n');
});
app.use(multipart({
	uploadDir: __dirname + '/tmp'
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	limit: '5kb',
	extended: true
}));
app.use(bodyParser.json({
	limit: '5kb'
}));
app.get('/login', function(req, res) {
	var hash = crypto.createHash('sha256').update(req.body.login.toLowerCase() + req.body.password.toLowerCase() + '*C&4GF087g*eGSD8FG802PG213-99AS-F0SAIGDI9h*gf)4{sd:,.VXVP2I023R').digest('hex');
	if (adminid === hash) {
		res.json({
			hash: hash,
			admin: true
		});
	} else {
		res.status(401).send('Wrong credentials!');
	}
});

app.post('/bgpic/:_id', upload.single('bgimage'), function(req, res) {
	if (adminid === req.body.hash) {
		im.resize({
			srcData: fs.readFileSync(req.file.path, 'binary'),
			width: 1920,
			format: 'jpg'
		}, function(err, stdout, stderr) {
			fs.writeFile(req.file.path, stdout, 'binary', function(err) {
				if (err) return console.error(err);
				var hash = crypto.createHash('md5'),
					rdd = fs.createReadStream(req.file.path);
				rdd.on('data', function(d) {
					hash.update(d);
				});
				rdd.on('end', function() {
					var newfilename = '';
					rdd.close();
					newfilename = hash.digest('hex') + '.jpg';
					console.log('Uploaded', newfilename);
					fs.rename(req.file.path, __dirname + '/pub/img/' + newfilename, function() {
						Video.findByIdAndUpdate(req.body._id, {
							bgimage: newfilename
						}, function(err, el) {
							if (err) return console.error(err);
							res.send('OK!');
						});
					});
				});
			});
		});
	} else {
		res.status(401).send('Wrong credentials!');
	}
});

app.post('/bgvideo/:_id', upload.single('bgvideo'), function(req, res) {
	if (adminid === req.body.hash) {
		var hash = crypto.createHash('md5'),
			rdd = fs.createReadStream(req.file.path);
		rdd.on('data', function(d) {
			hash.update(d);
		});
		rdd.on('end', function() {
			var newfilename = '';
			rdd.close();
			newfilename = hash.digest('hex') + '.webm';
			console.log('Uploaded', newfilename);
			fs.rename(req.file.path, __dirname + '/pub/video/' + newfilename, function() {
				Video.findByIdAndUpdate(req.body._id, {
					bgimage: newfilename
				}, function(err, el) {
					if (err) return console.error(err);
					res.send('OK!');
				});
			});
		});
	} else {
		res.status(401).send('Wrong credentials!');
	}
});

app.route('/video/:_id').get(function(req, res) {
	Video.findById(req.params._id, function(err, el) {
		(!err && el) ? res.json(el) : res.status(500).json(err);
	});
}).post(function(req, res) {
	if (adminid === req.body.hash) {
		delete req.body.hash;
		Video.create(req.body, function(err, el) {
			(!err && el) ? res.json(el) : res.status(500).json(err);
		})
	} else {
		res.status(401).send('Wrong credentials!');
	}
}).put(function(req, res) {
	if (adminid === req.body.hash) {
		delete req.body.hash;
		Video.findByIdAndUpdate(req.body._id, function(err, el) {
			(!err && el) ? res.json(el) : res.status(500).json(err);
		})
	} else {
		res.status(401).send('Wrong credentials!');
	}
}).delete(function(req, res) {
	if (adminid === req.body.hash) {
		Video.findByIdAndRemove(req.body._id, function(err, el) {
			(!err && el) ? res.json(el) : res.status(500).json(err);
		})
	} else {
		res.status(401).send('Wrong credentials!');
	}
});

app.use(serveStatic(__dirname + '/pub'));
//app.use(favicon(__dirname + "/pub/img/favicon.ico"));
app.listen(8088, function() {
	console.log("Started");
	mongoose.connect('mongodb://localhost:27017/designers');
})