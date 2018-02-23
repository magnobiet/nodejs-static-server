'use strict';

const express = require('express');
const router = express.Router();

router.all('/', (req, res) => {

	res.status(200);
	res.send(`pong from ${ req.method }`);

});

module.exports = router;
