const Joi = require("joi");
class OrdersValidation {
  #order_id = Joi.number().integer().max(100000000).min(1);
  #order_subtotal = Joi.number().min(1);
  #order_total_qty = Joi.number().min(1);
  #order_city = Joi.string().max(45).min(2);
  #order_town = Joi.string().max(45).min(2);
  #order_delivery_address = Joi.string().max(250).min(5);
  #order_phonenumber = Joi.string().max(10).min(10);
  #order_comment = Joi.string().max(2500);
  #order_status = Joi.string().trim().equal("pending", "confirmed");
  #order_updated_at = Joi.date().timestamp();
  #order_created_at = Joi.date().timestamp();

  validateOrderOptional = (data) => {
    const schema = Joi.object({
      order_id: this.#order_id.optional(),
      order_subtotal: this.#order_subtotal.optional(),
      order_total_qty: this.#order_total_qty.optional(),
      order_city: this.#order_city.optional(),
      order_town: this.#order_town.optional(),
      order_delivery_address: this.#order_delivery_address.optional(),
      order_phonenumber: this.#order_phonenumber.optional(),
      order_comment: this.#order_comment.optional(),
      order_status: this.#order_status.optional(),
      order_updated_at: this.#order_updated_at.optional(),
      order_created_at: this.#order_created_at.optional(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateOrderId = (data) => {
    const schema = Joi.object({
      order_id: this.#order_id.required(),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };

  validateCreateOrder = (data) => {
    const schema = Joi.object({});
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
  validateUpdateOrder = (data) => {
    const schema = Joi.object({
      order_id: this.#order_id.required(),
      order_city: this.#order_city.required(),
      order_town: this.#order_town.required(),
      order_delivery_address: this.#order_delivery_address.required(),
      order_phonenumber: this.#order_phonenumber.required(),
      order_comment: this.#order_comment.required(),
      order_status: this.#order_status.optional().default("confirmed"),
    });
    const { value, error, warning } = schema.validate(data);
    return [value, error, warning];
  };
}

module.exports = new OrdersValidation();
