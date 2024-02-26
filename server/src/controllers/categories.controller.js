const model = require("../models/categories.model");
const { _400, _200, _500, _204, _409 } = require("../utils/apiRespones.util");
const { throw_500, throw_404 } = require("../utils/errorsHandlers.util");
const {
  validateCategoryOptional,
  validateCreateCategory,
  validateUpdateCategory,
  validateCategoryId,
} = require("../validations/categories.validation");

class CategoriesController {
  getAllCategories = () => async (req, res, next) => {
    try {
      const filters = req.query;

      const [dataValidate, errorValidate] = validateCategoryOptional(filters);
      if (errorValidate) return _400(res, { error: errorValidate });

      const [resultModel, errorModel] = await model.getAllCategories({
        filterObjects: dataValidate,
      });
      if (errorModel) return _500(res, { error: errorModel });
      return _200(res, { data: resultModel });
    } catch (error) {
      next(error);
    }
  };

  createCategory = () => async (req, res, next) => {
    try {
      const body = req.body;

      const [dataValidate, errorValidate] = validateCreateCategory(body);
      if (errorValidate) return _400(res, { error: errorValidate });

      //check if the same category name exist in db
      const [resultCategoryExistModel, errorCategoryExistModel] =
        await model.getAllCategories({
          filterObjects: dataValidate,
          selectStringArray: [model._categoryId],
        });
      if (errorCategoryExistModel)
        return _500(res, { error: errorCategoryExistModel });
      else if (resultCategoryExistModel.length !== 0) {
        return _409(res, { error: "this category name already exist" });
      }

      const [resultModel, errorModel] = await model.createCategory(
        dataValidate
      );
      if (errorModel) return _500(res, { error: errorModel });
      else if (resultModel.length === 0) {
        return _500(res, { error: "categories could not be created" });
      }

      const createdCategory = await this._getCategoryById({
        categoryId: resultModel[0],
      });

      return _200(res, { data: createdCategory });
    } catch (err) {
      next(err);
    }
  };

  updateCategory = () => async (req, res, next) => {
    try {
      const body = req.body;

      const [dataValidate, errorValidate] = validateUpdateCategory(body);
      if (errorValidate) return _400(res, { error: errorValidate });
      //check if category id exist
      await this._getCategoryById({
        categoryId: dataValidate.category_id,
      });

      const [resultModel, errorModel] = await model.updateCategory(
        dataValidate
      );
      if (errorModel) throw_500(errorModel);
      else if (resultModel == 0) {
        return _500(res, { error: "categories could not be updated" });
      }

      const updatedCategory = await this._getCategoryById({
        categoryId: dataValidate.category_id,
      });

      return _200(res, { data: updatedCategory });
    } catch (err) {
      if (err.error.errno === 1062)
        return _409(res, { error: "this category name exist" });
      next(err);
    }
  };

  deleteCategory = () => async (req, res, next) => {
    try {
      const { category_id } = req.params;
      const [dataValidate, errorValidate] = validateCategoryId({ category_id });
      if (errorValidate) return _400(res, { error: errorValidate });

      const [resultModel, errorModel] = await model.deleteCategory({
        category_id: dataValidate.category_id,
      });
      if (errorModel) return _500(res, { error: errorModel });
      else if (resultModel === 0) {
        return _500(res, { error: "categories could not be deleted" });
      }

      return _204(res);
    } catch (err) {
      next(err);
    }
  };

  _getCategoryById = async ({ categoryId, returnNotFound = false }) => {
    const message404 = `no category found by this id ${categoryId}`;
    const [resultModel, errorModel] = await model.getAllCategories({
      filterObjects: {
        [model._categoryId]: categoryId,
      },
    });
    if (errorModel) throw_500(errorModel);
    else if (resultModel.length === 0 && !returnNotFound) throw_404(message404);
    return resultModel;
  };
}

module.exports = new CategoriesController();
