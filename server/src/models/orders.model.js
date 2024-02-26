const {
  queryGetResultError,
  mutationCreateResultError,
  mutationUpdateResultError,
  mutationDeleteResultError,
} = require("./baseQuery.model");

class OrdersModel {
  _orderTbName = "orders";
  _orderId = "order_id";
  _orderSubtotal = "order_subtotal";
  _orderTotalQty = "order_total_qty";
  _orderCity = "order_city";
  _orderTown = "order_town";
  _orderDeliveryAddress = "order_delivery_address";
  _orderPhoneNumber = "order_phonenumber";
  _orderStatus = "order_status";
  _orderComment = "order_comment";
  _orderCreatedAt = "order_created_at";
  _orderUpdatedAt = "order_updated_at";

  _selectAll = [
    this._orderId,
    this._orderSubtotal,
    this._orderTotalQty,
    this._orderCity,
    this._orderTown,
    this._orderDeliveryAddress,
    this._orderPhoneNumber,
    this._orderStatus,
    this._orderComment,
    this._orderCreatedAt,
    this._orderUpdatedAt,
  ];
  getAllOrders = async ({ filterObjects, selectStringArray = [] }) => {
    const select =
      selectStringArray.length === 0 ? this._selectAll : selectStringArray;
    return await queryGetResultError({
      tableName: this._orderTbName,
      selectArray: select,
      whereObjects: filterObjects,
    });
  };
  createOrder = async () => {
    return await mutationCreateResultError({
      tableName: this._orderTbName,
      data: {},
    });
  };
  updateOrder = async (data) => {
    return await mutationUpdateResultError({
      tableName: this._orderTbName,
      data,
      whereObjects: {
        [this._orderId]: data.order_id,
      },
    });
  };
  deleteOrder = async ({ order_id }) => {
    return await mutationDeleteResultError({
      tableName: this._orderTbName,
      whereObjects: {
        [this._orderId]: order_id,
      },
    });
  };
}

module.exports = new OrdersModel();
