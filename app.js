'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const faviconPath = path.join(__dirname, 'public', 'favicon.ico');

if (fs.existsSync(faviconPath)) {
	app.use(favicon(faviconPath));
}

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

	res.setHeader('Strict-Transport-Security', 'max-age=63072000');
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-XSS-Protection', '1; mode=block');

	next();

});

app.use('/ping', require('./routes/ping'));
app.use('/api', require('./routes/api'));
app.use('/*', require('./routes/index'));

app.use((req, res, next) => {

	const err = new Error('Not Found');
	err.status = 404;
	next(err);

});

app.use((err, req, res) => {

	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');

});

module.exports = app;
