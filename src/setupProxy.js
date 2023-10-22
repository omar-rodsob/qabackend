const createProxyMiddleware = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "graphql"], {
      target: `https://qabackend.vercel.app`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
