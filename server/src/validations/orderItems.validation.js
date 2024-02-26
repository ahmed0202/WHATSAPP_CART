const Joi = require("joi");
class OrderItemsValidation {
  #order_item_id = Joi.number().integer().max(100000000).min(1);
  #order_id = Joi.number().integer().max(100000000).min(1);
  #product_id = Joi.number().integer().max(100000000).min(1);
  #order_item_qty = Joi.number();
  #order_item_price = Joi.number().min(1);
  #order_updated_at = Joi.date().timestamp();
  #order_created_at = Joi.date().timestamp();

  validateOIOptional = (data) => {
    const schema = Joi.object({
      order_item_id: this.#order_item_id.optional(),
      order_id: this.#order_id.optional(),
      product_id: this.#product_id.optional(),
      order_item_qty: this.#order_item_qty.optional(),
      order_item_price: this.#order_item_price.optional(),
      order_updated_at: this.#order_updated_at.optional(),
      order_created_at: this.#order_created_at.optional(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateOIId = (data) => {
    const schema = Joi.object({
      order_item_id: this.#order_id.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };

  validateCreateOI = (data) => {
    const schema = Joi.object({
      order_id: this.#order_id.required(),
      product_id: this.#product_id.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateUpdateOI = (data) => {
    const schema = Joi.object({
      order_item_id: this.#order_item_id.required(),
      order_item_qty: this.#order_item_qty.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
}

module.exports = new OrderItemsValidation();
