const model = require("../models/orderItems.model");
const { _400, _500, _200, _201 } = require("../utils/apiRespones.util");
const {
  throw_400,
  throw_500,
  throw_404,
} = require("../utils/errorsHandlers.util");
const {
  validateOIOptional,
  validateCreateOI,
  validateUpdateOI,
  validateOIId,
} = require("../validations/orderItems.validation");
const { _getProductById } = require("./products.controller");

class OrderItemsController {
  getAllOrderItems = () => async (req, res, next) => {
    try {
      const filters = req.query;

      const [dataValidate, errorValidate] = validateOIOptional(filters);
      if (errorValidate) return _400(res, { error: errorValidate });

      const [resultModel, errorModel] = await model.getAllOrderItems({
        filterObjects: dataValidate,
      });
      if (errorModel) return _500(res, { error: errorModel });

      return _200(res, { data: resultModel });
    } catch (err) {
      next(err);
    }
  };

  createOrderItem = () => async (req, res, next) => {
    try {
      const body = req.body;

      const [dataValidate, errorValidate] = validateCreateOI(body);
      if (errorValidate) return _400(res, { error: errorValidate });

      //if product exist in order then update qty only
      const [isDuplicateItemModel, errorDuplicateItemModel] =
        await model.getAllOrderItems({
          filterObjects: {
            [model._productId]: dataValidate.product_id,
            [model._orderId]: dataValidate.order_id,
          },
          selectStringArray: [model._oiId, model._oiQty],
        });
      if (errorDuplicateItemModel) return _500(errorDuplicateItemModel);
      else if (isDuplicateItemModel.length !== 0) {
        const { [model._oiId]: id, [model._oiQty]: qty } =
          isDuplicateItemModel[0];

        await this._updateOrderItemById({ orderItemId: id, newOIQty: qty + 1 });
        return _201(res);
      }

      //get product by id from db
      const product = await _getProductById({
        productId: dataValidate.product_id,
      });

      //add product price to new order item with qty of 1
      const data = {
        ...dataValidate,
        [model._oiPrice]: product[0].product_price,
        [model._oiQty]: 1,
      };

      //create order item
      const [resultModel, errorModel] = await model.createOrderItem(data);
      if (errorModel) return _500(res, { error: errorModel });
      else if (resultModel.length === 0) {
        return _500(res, { error: "order item could not be created" });
      }

      //get created newly order item
      const createdOrderItem = await this._getOrderItemById({
        orderItemId: resultModel[0],
      });

      return _200(res, { data: createdOrderItem });
    } catch (err) {
      next(err);
    }
  };

  updateOrderItem = () => async (req, res, next) => {
    try {
      const body = req.body;

      const [dataValidate, errorValidate] = validateUpdateOI(body);
      if (errorValidate) return _400(res, { error: errorValidate });

      //if new qty less than 1 then delete order item
      if (dataValidate.order_item_qty < 1) {
        await this._deleteOrderItemById({
          orderItemId: dataValidate.order_item_id,
        });
        return _200(res, {
          data: [
            {
              ...dataValidate,
              order_item_qty: 0,
            },
          ],
        });
      }

      //update order item with qty
      await this._updateOrderItemById({
        orderItemId: dataValidate.order_item_id,
        newOIQty: dataValidate.order_item_qty,
      });

      //get updated order item
      const updatedOrderItem = await this._getOrderItemById({
        orderItemId: dataValidate.order_item_id,
      });

      return _200(res, { data: updatedOrderItem });
    } catch (err) {
      next(err);
    }
  };

  deleteOrderItem = () => async (req, res, next) => {
    try {
      const { order_item_id } = req.params;

      const [dataValidate, errorValidate] = validateOIId({ order_item_id });
      if (errorValidate) return _400(res, { error: errorValidate });

      // check if order item exist
      await this._getOrderItemById({ orderItemId: dataValidate.order_item_id });

      //delete order item
      await this._deleteOrderItemById({
        orderItemId: dataValidate.order_item_id,
      });

      return _200(res, {
        data: [{ order_item_id: dataValidate.order_item_id }],
      });
    } catch (err) {
      next(err);
    }
  };

  _getOrderItemById = async ({ orderItemId, returnNotFound = false }) => {
    const message404 = `no OrderItem found by this id ${orderItemId}`;

    const [resultModel, errorModel] = await model.getAllOrderItems({
      filterObjects: {
        [model._oiId]: orderItemId,
      },
    });
    if (errorModel) throw_500(errorModel);
    else if (resultModel.length === 0 && !returnNotFound) throw_404(message404);
    return resultModel;
  };

  _updateOrderItemById = async ({ orderItemId, newOIQty }) => {
    const message500 = `order item could not be updated id is${orderItemId}`;

    const [resultModel, errorModel] = await model.updateOrderItem({
      [model._oiId]: orderItemId,
      [model._oiQty]: newOIQty,
    });
    if (errorModel) throw_500(errorModel);
    else if (resultModel.length === 0) {
      throw_500(message500);
    }
    return true;
  };

  _deleteOrderItemById = async ({ orderItemId }) => {
    const message500 = ` order item could not be deleted by this id ${orderItemId}`;
    const [resultModel, errorModel] = await model.deleteOrderItem({
      [model._oiId]: orderItemId,
    });
    if (errorModel) throw_500(errorModel);
    else if (resultModel === 0) throw_500(message500);
    return true;
  };
}

module.exports = new OrderItemsController();
