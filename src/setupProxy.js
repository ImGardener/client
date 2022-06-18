const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/service", {
      target: "http://api.nongsaro.go.kr",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/NihhsTodayFlowerInfo01", {
      target: "http://apis.data.go.kr/1390804",
      changeOrigin: true,
    })
  );
};
