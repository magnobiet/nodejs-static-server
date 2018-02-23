'use strict';

const proxy = require('http-proxy-middleware');

module.exports = proxy({
	target: process.env.PROXY_TARGET,
	changeOrigin: true,
	pathRewrite: {
		'^/api': ''
	},
	onProxyReq: (proxyReq, req) => {

		if (req.body) {
			proxyReq.write(JSON.stringify(req.body));
		}

	}
});
