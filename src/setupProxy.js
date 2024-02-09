const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://port-0-backend-5r422alqbmp8ta.sel4.cloudtype.app',
      changeOrigin: true,
    })
  );
};
