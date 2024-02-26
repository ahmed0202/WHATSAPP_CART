const model = require("../models/products.model");
const { _400, _500, _200, _204 } = require("../utils/apiRespones.util");
const {
  throw_400,
  throw_500,
  throw_404,
} = require("../utils/errorsHandlers.util");
const {
  convertFileObjectToUri,
  deleteSingleFileByObject,
  deleteSingleFileByUri,
} = require("../utils/file.utils");
const { convertTextToJson } = require("../utils/string.util");
const {
  validateProductOptional,
  validateCreateProduct,
  validateUpdateProduct,
  validateProductId,
} = require("../validations/products.validation");

class ProductsController {
  getAllProducts = () => async (req, res, next) => {
    try {
      const filters = req.query;
      const [dataValidate, errorValidate] = validateProductOptional(filters);
      if (errorValidate) return _400(res, { error: errorValidate });

      const [resultModel, errorModel] = await model.getAllProducts({
        filterObjects: dataValidate,
      });
      if (errorModel) return _500(res, { error: errorModel });

      return _200(res, { data: resultModel });
    } catch (err) {
      next(err);
    }
  };
  createProduct = () => async (req, res, next) => {
    try {
      //convert text to json because we uesed formdata
      const product = convertTextToJson(req.body.product);
      //convert file object to uri
      const product_file_uri = !req.file
        ? null
        : convertFileObjectToUri(req.file);
      const body = { ...product, product_file_uri };
      // if file object doesnt exist then delete product file uri so we dont pass it to validation
      !req.file && delete body.product_file_uri;

      //validate body
      const [dataValidate, errorValidate] = validateCreateProduct(body);
      if (errorValidate) throw_400(errorValidate);

      //craete product
      const [resultModel, errorModel] = await model.createProduct(dataValidate);
      if (errorModel) throw_500(errorModel);
      else if (resultModel.length === 0) {
        throw_400("product could not be created");
      }

      //get created product by id
      const createdProduct = await this._getProductById({
        productId: resultModel[0],
      });

      return _200(res, { data: createdProduct });
    } catch (err) {
      deleteSingleFileByObject(req.file);
      next(err);
    }
  };
  updateProduct = () => async (req, res, next) => {
    try {
      //converte text to json
      const product = convertTextToJson(req.body.product);
      //convert the provided file to uri ot null
      const product_file_uri = !req.file
        ? null
        : convertFileObjectToUri(req.file);
      const body = { ...product, product_file_uri };
      //if file is not sended then delete file uri because we dont want to updated it to null in case it exist
      !req.file && delete body.product_file_uri;

      //validate body
      const [dataValidate, errorValidate] = validateUpdateProduct(body);
      if (errorValidate) throw_400(errorValidate);

      //get product by id
      const resultProductExistModel = await this._getProductById({
        productId: dataValidate.product_id,
        returnNotFound: true,
      });
      if (resultProductExistModel.length === 0)
        throw_404(`no product was founded`);

      //update product by id
      const [resultModel, errorModel] = await model.updateProduct(dataValidate);
      if (errorModel) throw_500(errorModel);
      else if (resultModel === 0) throw_400("product could not be updated");

      //if file and oldUri exist then delete oldUri
      if (req.file && resultProductExistModel[0].product_file_uri != null)
        deleteSingleFileByUri(resultProductExistModel[0].product_file_uri);

      //get updated product by id
      const updatedProduct = await this._getProductById({
        productId: dataValidate.product_id,
      });

      return _200(res, { data: updatedProduct });
    } catch (err) {
      deleteSingleFileByObject(req.file);
      next(err);
    }
  };
  deleteProduct = () => async (req, res, next) => {
    let trxDeleteProduct;

    try {
      const { product_id } = req.params;

      //validate product_id
      const [dataValidate, errorValidate] = validateProductId({ product_id });
      if (errorValidate) return _400(res, { error: errorValidate });

      //get product by id
      const resultProductExistModel = await this._getProductById({
        productId: dataValidate.product_id,
        returnNotFound: true,
      });
      if (resultProductExistModel.length === 0) throw_404("no product founded");

      //delete the product and get back commit or rollback
      trxDeleteProduct = await model.deleteProductTrx({
        product_id: dataValidate.product_id,
      });

      //if product file uri exist then delete it
      if (typeof resultProductExistModel[0].product_file_uri === "string") {
        deleteSingleFileByUri(resultProductExistModel[0].product_file_uri);
      }

      //commit after no error
      await trxDeleteProduct.commit();
      return _204(res);
    } catch (err) {
      //check if trx exist and then roll back
      if (trxDeleteProduct) {
        await trxDeleteProduct.rollback();
      }
      next(err);
    }
  };

  _getProductById = async ({ productId, returnNotFound = false }) => {
    const message404 = `no Product found by this id ${productId}`;
    const [resultModel, errorModel] = await model.getAllProducts({
      filterObjects: {
        [model._productId]: productId,
      },
    });
    if (errorModel) throw_500(errorModel);
    else if (resultModel.length === 0 && !returnNotFound) throw_404(message404);
    return resultModel;
  };
}

module.exports = new ProductsController();
