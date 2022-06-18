const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/service", {
      target: "http://api.nongsaro.go.kr",
      changeOrigin: true,
    })
  );
};
