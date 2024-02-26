const multer = require("multer");
const { _400, _500 } = require("../../../utils/apiRespones.util");

const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return _400(res, { error: error });
  } else if (error) {
    // An unknown error occurred.

    return _500(res, { error: `${error}` });
  } else {
    // No error, proceed to the next middleware or route handler.
    next();
  }
};

module.exports = handleMulterError;
