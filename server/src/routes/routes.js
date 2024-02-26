const express = require("express");
const { sendResponse, _500 } = require("../utils/apiRespones.util");

const routes = express();
const prefix = "/api";
routes.use(`${prefix}/categories`, require("./categories.router"));
routes.use(`${prefix}/products`, require("./products.router"));
routes.use(`${prefix}/orders`, require("./orders.router"));
routes.use(`${prefix}/order-items`, require("./orderItems.router"));
routes.use(`${prefix}/files-resized`, require("./filesResizer.router"));

// middleware for all unresolved error in the backend
routes.use(async (err, req, res, next) => {
  if (err.status <= 499) {
    return sendResponse(res, err.status, {
      error: err.error,
      message: err.message,
    });
  }

  return _500(res, {
    error: `${err.error}`,
    message: `please take screen shot and contact us`,
  });
});
module.exports = routes;
