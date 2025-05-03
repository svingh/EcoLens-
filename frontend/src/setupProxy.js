const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy for the Java Backend (handling user-added notes)
  app.use(
    '/api/sewage',
    createProxyMiddleware({
      target: 'http://backend:8080',  // Java backend running in Docker container named 'backend'
      changeOrigin: true,
      logLevel: 'debug',  // Set to debug level for detailed logs
      onProxyReq: (proxyReq, req) => {
        console.warn('Proxying request to Java backend (Sewage):', 'http://backend:8080');
        console.warn('Original request path:', req.originalUrl);
        console.warn('Proxied request path:', proxyReq.path);
      },
      onError: (err) => {
        console.error('Proxy error for Java backend (Sewage):', err);
      },
      onProxyRes: (proxyRes) => {
        console.warn('Received response from Java backend (Sewage):', proxyRes.statusCode);
      },
    })
  );

  app.use(
    '/api/wastewater',
    createProxyMiddleware({
      target: 'http://backend:8080',
      changeOrigin: true,
      logLevel: 'debug',  // Set to debug level for detailed logs
      onProxyReq: (proxyReq, req) => {
        console.warn('Proxying request to Java backend (Wastewater):', 'http://backend:8080');
        console.warn('Original request path:', req.originalUrl);
        console.warn('Proxied request path:', proxyReq.path);
      },
      onError: (err) => {
        console.error('Proxy error for Java backend (Wastewater):', err);
      },
      onProxyRes: (proxyRes) => {
        console.warn('Received response from Java backend (Wastewater):', proxyRes.statusCode);
      },
    })
  );
};
