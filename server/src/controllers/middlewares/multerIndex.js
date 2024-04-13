const manyFilesValidation = require("./multerMiddlewares/manyFilesValidation.middleware");
const singleFileValidation = require("./multerMiddlewares/singleFileValidation.middleware");
const handleMulterError = require("./multerMiddlewares/handleMulterError.middleware");
const uploadMulterFile = require("./multerMiddlewares/uploadFile.middleware");

module.exports = {
  manyFilesValidation,
  singleFileValidation,
  handleMulterError,
  uploadMulterFile,
};
