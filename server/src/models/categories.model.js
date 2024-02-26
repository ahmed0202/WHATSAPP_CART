const {
  queryGetResultError,
  mutationCreateResultError,
  mutationUpdateResultError,
  mutationDeleteResultError,
} = require("./baseQuery.model");

class CategoriesModel {
  _categoryTbName = "categories";
  _categoryId = "category_id";
  _categoryName = "category_name";
  _categoryCreatedAt = "category_created_at";
  _categoryUpdatedAt = "category_updated_at";

  _selectAll = [
    this._categoryId,
    this._categoryName,
    this._categoryUpdatedAt,
    this._categoryCreatedAt,
  ];
  getAllCategories = async ({ filterObjects, selectStringArray = [] }) => {
    const select =
      selectStringArray.length === 0 ? this._selectAll : selectStringArray;
    return await queryGetResultError({
      selectArray: select,
      tableName: this._categoryTbName,
      whereObjects: filterObjects,
    });
  };
  createCategory = async (data) => {
    return await mutationCreateResultError({
      tableName: this._categoryTbName,
      data,
    });
  };
  updateCategory = async (data) => {
    return await mutationUpdateResultError({
      tableName: this._categoryTbName,
      data,
      whereObjects: {
        [this._categoryId]: data.category_id,
      },
    });
  };
  deleteCategory = async ({ category_id }) => {
    return await mutationDeleteResultError({
      tableName: this._categoryTbName,
      whereObjects: {
        [this._categoryId]: category_id,
      },
    });
  };
}

module.exports = new CategoriesModel();
