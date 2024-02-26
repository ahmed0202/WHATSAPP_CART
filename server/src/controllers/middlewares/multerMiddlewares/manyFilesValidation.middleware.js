const { _400 } = require("../../../utils/apiRespones.util");
const fileUtils = require("../../../utils/file.utils");
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "video/mp4",
];
// Middleware validation for file upload
const manyFilesValidation = async (req, res, next) => {
  const files = req.files;
  let errors = [];
  try {
    if (!files) {
      return next();
    }

    validateFiles(files, errors);

    if (errors.length > 0) {
      throw _400(res, { error: errors });
    }
    return next();
  } catch (error) {
    fileUtils.deleteManyFilesByObject(files);
    return error;
  }
};

// Validate uploaded files
const validateFiles = (files, errors) => {
  files.forEach((file) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      errors.push(`Invalid file type: ${file.originalname}`);
    }
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`File size exceeds the limit: ${file.originalname}`);
    }
  });
};

module.exports = manyFilesValidation;
