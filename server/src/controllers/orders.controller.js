const model = require("../models/orders.model");
const { _400, _500, _200, _404, _204 } = require("../utils/apiRespones.util");
const {
  validateOrderOptional,
  validateUpdateOrder,
  validateOrderId,
} = require("../validations/orders.validation");
const oiModel = require("../models/orderItems.model");

class OrdersController {
  getAllOrders = () => async (req, res, next) => {
    try {
      const filters = req.query;

      const [dataValidate, errorValidate] = validateOrderOptional(filters);
      if (errorValidate) return _400(res, { error: errorValidate });

      const [resultModel, errorModel] = await model.getAllOrders({
        filterObjects: dataValidate,
      });
      if (errorModel) return _500(res, { error: errorModel });

      return _200(res, { data: resultModel });
    } catch (err) {
      next(err);
    }
  };

  createOrder = () => async (req, res, next) => {
    try {
      const [resultModel, errorModel] = await model.createOrder();
      if (errorModel) return _500(res, { error: errorModel });
      else if (resultModel.length === 0) {
        return _500(res, { error: "order could not be created" });
      }

      const createdCategory = await this._getOrderById({
        orderId: resultModel[0],
      });

      return _200(res, { data: createdCategory });
    } catch (err) {
      next(err);
    }
  };

  updateOrder = () => async (req, res, next) => {
    try {
      const body = req.body;

      const [dataValidate, errorValidate] = validateUpdateOrder(body);
      if (errorValidate) return _400(res, { error: errorValidate });

      //get all ordered items
      const [getAllOrderItemsByOrderId, errorgetAllOrderItemsByOrderId] =
        await oiModel.getAllOrderItems({
          filterObjects: {
            [oiModel._orderId]: dataValidate.order_id,
          },
          selectStringArray: [oiModel._oiQty, oiModel._oiPrice, oiModel._oiId],
        });
      if (errorgetAllOrderItemsByOrderId) {
        return _500(res, { error: errorgetAllOrderItemsByOrderId });
      } else if (getAllOrderItemsByOrderId.length === 0) {
        return _404(res, { error: "order have no item to be processed" });
      }
      //calculate order amount and total qty by ordered items
      let totalQty = 0;
      let totalAmount = 0;
      getAllOrderItemsByOrderId.forEach((orderItem) => {
        const { [oiModel._oiPrice]: price, [oiModel._oiQty]: qty } = orderItem;
        totalAmount += parseInt(qty) * parseFloat(price);
        totalQty += parseInt(qty);
      });

      const data = {
        ...dataValidate,
        [model._orderSubtotal]: totalAmount,
        [model._orderTotalQty]: totalQty,
      };

      const [resultModel, errorModel] = await model.updateOrder(data);
      if (errorModel) return _500(res, { error: errorModel });
      else if (resultModel === 0) {
        return _500(res, { error: "order could not be upadted" });
      }

      const updatedCategory = await this._getOrderById({
        orderId: dataValidate.order_id,
      });

      return _200(res, { data: updatedCategory });
    } catch (err) {
      next(err);
    }
  };
  deleteOrder = () => async (req, res, next) => {
    try {
      const { order_id } = req.params;

      const [dataValidate, errorValidate] = validateOrderId({ order_id });
      if (errorValidate) return _400(res, { error: errorValidate });

      const [resultModel, errorModel] = await model.deleteOrder({
        order_id: dataValidate.order_id,
      });
      if (errorModel) return _500(res, { error: errorModel });
      else if (resultModel === 0)
        return _500(res, { error: "order could not be deleted" });

      return _200(res, { data: { order_id: dataValidate.order_id } });
    } catch (error) {
      next(error);
    }
  };
  _getOrderById = async ({ orderId, returnNotFound = false }) => {
    const message404 = `no Order found by this id ${orderId}`;
    const [resultModel, errorModel] = await model.getAllOrders({
      filterObjects: {
        [model._orderId]: orderId,
      },
    });
    if (errorModel) throw_500(errorModel);
    else if (resultModel.length === 0 && !returnNotFound) throw_404(message404);
    return resultModel;
  };
}

module.exports = new OrdersController();
