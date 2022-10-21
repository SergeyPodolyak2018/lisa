const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        ['/accounts','/connections','/campaigns/','/user/me','/auth/logout','/campaigns/connection/search/','/campaigns/connection/new','/templates/','/templates/new'],
        createProxyMiddleware({
            target: 'https://lisa-l.herokuapp.com',
            changeOrigin: true,
            onProxyReq(proxyReq) {
                if (proxyReq.getHeader("origin")) {
                    proxyReq.setHeader("origin", "https://lisa-l.herokuapp.com")
                }
            },
            logLevel: "debug",
        })
    );
};
