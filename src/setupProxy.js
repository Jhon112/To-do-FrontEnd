const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/users",
    createProxyMiddleware({
      target: "https://user-microservices.herokuapp.com/api/v1",
      changeOrigin: true
    })
  );
  app.use(
    "/tasks",
    createProxyMiddleware({
      target: "https://tasks-microservice-904.herokuapp.com/api/v1",
      changeOrigin: true
    })
  );
};
