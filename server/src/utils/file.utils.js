const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const unlinkAsync = promisify(fs.unlink);
//TODO: try to use unlinkAsync for better file deletion handling
class FileUtils {
  deleteManyFilesByObject = (files) => {
    try {
      if (!files) {
        return;
      }
      files.forEach((file) => fs.unlinkSync(file.path));
    } catch (error) {
      throw error;
    }
  };
  deleteSingleFileByObject = (file) => {
    try {
      if (!file) {
        return;
      }
      if (!fs.existsSync(file.path)) {
        return;
      }

      fs.unlinkSync(file.path);
      return;
    } catch (error) {
      throw error;
    }
  };
  deleteManyFileByUri = (uriArray) => {
    if (uriArray.length === 0) return;

    uriArray.forEach((uri) => {
      if (typeof uri !== "string") {
        throw new Error("Invalid URI provided");
      }

      if (!fs.existsSync(this._fileUriPathJoiner(uri))) {
        return;
      }
      const filePath = this._fileUriPathJoiner(uri);

      fs.unlinkSync(filePath);
      if (fs.existsSync(this._fileUriPathJoiner(uri))) {
        throw new Error("File couldn't be deleted on the server");
      }
    });

    return;
  };
  deleteSingleFileByUri = (uri) => {
    if (typeof uri !== "string") {
      throw new Error("Invalid URI provided");
    }

    if (!fs.existsSync(this._fileUriPathJoiner(uri))) {
      return;
    }
    const filePath = this._fileUriPathJoiner(uri);

    fs.unlinkSync(filePath);
    if (fs.existsSync(this._fileUriPathJoiner(uri))) {
      throw new Error("File couldn't be deleted on the server");
    }
    return;
  };

  /**
   * this function only accept file object
   */
  convertFileObjectToUri = (file) => {
    const uri = file.destination.split(".").pop() + "/" + file.filename;
    return uri;
  };
  _fileUriPathJoiner = (uri) => {
    if (typeof uri !== "string") {
      throw new Error("Invalid URI provided");
    }

    // ("this path joiner depend on your folder structure ");
    return path.join(__dirname, "..", "..", uri);
  };
}

module.exports = new FileUtils();
