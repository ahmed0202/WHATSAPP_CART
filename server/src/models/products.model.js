const {
  queryGetResultError,
  mutationCreateResultError,
  mutationUpdateResultError,
  trxMutationDeleteComRol,
} = require("./baseQuery.model");

class ProductsModel {
  _productTbName = "products";
  _productId = "product_id";
  _categoryId = "category_id";
  _productName = "product_name";
  _productCode = "product_code";
  _productFileUri = "product_file_uri";
  _productPrice = "product_price";
  _productStatus = "product_status";
  _productUpdatedAt = "product_updated_at";
  _productCreatedAt = "product_created_at";

  _selectAll = [
    this._productId,
    this._categoryId,
    this._productName,
    this._productCode,
    this._productFileUri,
    this._productPrice,
    this._productStatus,
    this._productUpdatedAt,
    this._productCreatedAt,
  ];
  getAllProducts = async ({ filterObjects, selectStringArray = [] }) => {
    const select =
      selectStringArray.length === 0 ? this._selectAll : selectStringArray;
    return await queryGetResultError({
      selectArray: select,
      tableName: this._productTbName,
      whereObjects: filterObjects,
    });
  };
  createProduct = async (data) => {
    return await mutationCreateResultError({
      tableName: this._productTbName,
      data,
    });
  };
  updateProduct = async (data) => {
    return await mutationUpdateResultError({
      tableName: this._productTbName,
      data,
      whereObjects: {
        [this._productId]: data.product_id,
      },
    });
  };
  deleteProductTrx = async ({ product_id }) => {
    return await trxMutationDeleteComRol({
      tableName: this._productTbName,
      whereObjects: {
        [this._productId]: product_id,
      },
    });
  };
}

module.exports = new ProductsModel();
