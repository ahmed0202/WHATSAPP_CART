const Joi = require("joi");
class CategoriesValidation {
  #category_id = Joi.number().integer().max(100000000).min(1);
  #category_name = Joi.string().max(100).min(2);
  #category_updated_at = Joi.date().timestamp();
  #category_created_at = Joi.date().timestamp();

  validateCategoryOptional = (data) => {
    const schema = Joi.object({
      category_id: this.#category_id.optional(),
      category_name: this.#category_name.optional(),
      category_updated_at: this.#category_updated_at.optional(),
      category_created_at: this.#category_created_at.optional(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateCategoryId = (data) => {
    const schema = Joi.object({
      category_id: this.#category_id.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };

  validateCreateCategory = (data) => {
    const schema = Joi.object({
      category_name: this.#category_name.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateUpdateCategory = (data) => {
    const schema = Joi.object({
      category_id: this.#category_id.required(),
      category_name: this.#category_name.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
}

module.exports = new CategoriesValidation();
