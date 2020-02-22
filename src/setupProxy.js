const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use("/users",
    createProxyMiddleware({
      target: "ec2-18-232-100-104.compute-1.amazonaws.com",
      changeOrigin: true
    }));
  app.use(
    "/tasks",
    createProxyMiddleware({
      target: "https://tasks-microservice-904.herokuapp.com/api/v1",
      changeOrigin: true
    })
  );
};
