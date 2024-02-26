const { _fileUriPathJoiner } = require("../utils/file.utils");
const Jimp = require("jimp");
class FilesResizer {
  resize = () => async (req, res, next) => {
    try {
      const { file_uri } = req.params;
      const width = req.query.w ? parseInt(req.query.w) : null;
      const height = req.query.h ? parseInt(req.query.h) : null;
      const quality = req.query.q ? parseInt(req.query.q) : 100;

      //TODO:add validation

      const convertedFile = "/public/" + file_uri;

      //TODO:chack if file supported for resize

      const filePath = _fileUriPathJoiner(convertedFile);

      const file = await Jimp.read(filePath);
      // console.log(file);
      // file.contain(250, 250);
      if (width && height) {
        file.resize(width, height);
      } else if (width && !height) {
        file.resize(width, Jimp.AUTO);
      } else if (!width && height) {
        file.resize(Jimp.AUTO, height);
      }

      file.quality(quality);

      const buffer = await file.getBufferAsync(file.getMIME());

      res.set("Content-Type", file.getMIME());
      res.send(buffer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new FilesResizer();
