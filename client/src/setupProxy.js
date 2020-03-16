
const express = require('express');
const { createProxyMiddleware }  = require('http-proxy-middleware');
const app = express();

module.exports = function(app) {
        app.use(createProxyMiddleware('api/posts', { target: 'http://localhost:5000/posts' }));
        app.use(createProxyMiddleware('api/users', { target: 'http://localhost:5000/users' }));
        app.use(createProxyMiddleware('api/google', { target: '  http://localhost:5000/auth/google' }));
        app.use(createProxyMiddleware('api/google', { target: '  http://localhost:5000/auth/google/yourquote' }));
}
