const { _400 } = require("../../../utils/apiRespones.util");
const fileUtils = require("../../../utils/file.utils");

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/png", "image/jpg", "image/jpeg"];
// Middleware validation for file upload
const singleFileValidation = async (req, res, next) => {
  const file = req.file;
  let errors = [];

  try {
    if (!file) {
      return next();
    }

    validateFile(file, errors);

    if (errors.length > 0) {
      throw _400(res, { error: errors });
    }

    return next();
  } catch (error) {
    fileUtils.deleteSingleFileByObject(file);
    return error;
  }
};

// Validate uploaded file
const validateFile = (file, errors) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return errors.push(`Invalid file type: ${file.originalname}`);
  }
  if (file.size > MAX_FILE_SIZE) {
    return errors.push(`File size exceeds the limit: ${file.originalname}`);
  }
};

module.exports = singleFileValidation;
