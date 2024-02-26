const Joi = require("joi");
class ProductsValidation {
  #product_id = Joi.number().integer().max(100000000).min(1);
  #category_id = Joi.number().integer().max(100000000).min(1);
  #product_name = Joi.string().max(200).min(3);
  #product_code = Joi.string().max(45).min(1);
  #product_file_uri = Joi.string().max(250).min(6);
  #product_price = Joi.number().min(1);
  #product_status = Joi.number().allow(0, 1);
  #product_updated_at = Joi.date().timestamp();
  #product_created_at = Joi.date().timestamp();

  validateProductOptional = (data) => {
    const schema = Joi.object({
      product_id: this.#product_id.optional(),
      category_id: this.#category_id.optional(),
      product_name: this.#product_name.optional(),
      product_code: this.#product_code.optional(),
      product_file_uri: this.#product_file_uri.optional(),
      product_price: this.#product_price.optional(),
      product_status: this.#product_status.optional(),
      product_updated_at: this.#product_updated_at.optional(),
      product_created_at: this.#product_created_at.optional(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateProductId = (data) => {
    const schema = Joi.object({
      product_id: this.#product_id.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };

  validateCreateProduct = (data) => {
    const schema = Joi.object({
      category_id: this.#category_id.required(),
      product_name: this.#product_name.required(),
      product_code: this.#product_code.optional(),
      product_file_uri: this.#product_file_uri.required(),
      product_price: this.#product_price.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateUpdateProduct = (data) => {
    const schema = Joi.object({
      product_id: this.#product_id.required(),
      category_id: this.#category_id.optional(),
      product_name: this.#product_name.optional(),
      product_code: this.#product_code.optional(),
      product_file_uri: this.#product_file_uri.optional(),
      product_price: this.#product_price.optional(),
      product_status: this.#product_status.optional(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
}

module.exports = new ProductsValidation();
