class APIResponses {
  // 200 ok response
  _200 = (res, { message = "ok", data = "none" } = {}) => {
    return this.sendResponse(res, 200, { message, data });
  };

  // 201 created response
  _201 = (res, { message = "created", data = "none" } = {}) => {
    return this.sendResponse(res, 201, { message, data });
  };

  // 204 done without returning data response
  _204 = (res, { message = "action happened", data = "none" } = {}) => {
    return this.sendResponse(res, 204, { message, data });
  };

  // 400 bad request
  _400 = (res, { message = "bad request", error = "none" } = {}) => {
    return this.sendResponse(res, 400, { message, error });
  };

  // 401 unauthorized Authentication is required and has failed.
  _401 = (res, { message = "unauthorized", error = "none" } = {}) => {
    return this.sendResponse(res, 401, { message, error });
  };

  // 403 Forbidden The client does not have permission to access the requested resource.
  _403 = (res, { message = "Forbidden", error = "none" } = {}) => {
    return this.sendResponse(res, 403, { message, error });
  };

  // 404 not found
  _404 = (res, { message = "not found", error = "none" } = {}) => {
    return this.sendResponse(res, 404, { message, error });
  };

  // 405 not allowed
  _405 = (res, { message = "not allowed", error = "none" } = {}) => {
    return this.sendResponse(res, 405, { message, error });
  };
  // 409 conflict item already exist
  _409 = (
    res,
    { message = "conflict item already exist", error = "none" } = {}
  ) => {
    return this.sendResponse(res, 409, { message, error });
  };
  // 500 internal server issue
  _500 = (res, { message = "internal server issue", error = "none" } = {}) => {
    return this.sendResponse(res, 500, { message, error });
  };

  // Common utility function for sending responses
  sendResponse = (res, statusCode, { message, data, error } = {}) => {
    if (
      !res ||
      typeof res.status !== "function" ||
      typeof res.json !== "function"
    ) {
      console.error("Invalid response object");
      return;
    }

    return res.status(statusCode).json({
      status: statusCode,
      message,
      data,
      error,
    });
  };
}

module.exports = new APIResponses();
