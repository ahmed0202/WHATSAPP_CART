const manyFilesValidation = require("./multerMiddlewares/ManyFilesValidation.middleware");
const singleFileValidation = require("./multerMiddlewares/SingleFileValidation.middleware");
const handleMulterError = require("./multerMiddlewares/handleMulterError.middleware");
const uploadMulterFile = require("./multerMiddlewares/uploadFile.middleware");

module.exports = {
  manyFilesValidation,
  singleFileValidation,
  handleMulterError,
  uploadMulterFile,
};
