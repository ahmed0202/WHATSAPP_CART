const db = require("../db");
const {
  queryGetResultError,
  mutationCreateResultError,
  mutationUpdateResultError,
  mutationDeleteResultError,
} = require("./baseQuery.model");
const pModel = require("./products.model");

class OrderItemsModel {
  _oiTbName = "order_items";
  _oiId = "order_item_id";
  _orderId = "order_id";
  _productId = "product_id";
  _oiQty = "order_item_qty";
  _oiPrice = "order_item_price";

  _oiUpdatedAt = "order_item_updated_at";
  _oiCreatedAt = "order_item_created_at";

  _selectAll = [
    this._oiId,
    this._orderId,
    this._productId,
    this._oiQty,
    this._oiPrice,
    this._oiUpdatedAt,
    this._oiCreatedAt,
  ];

  getAllOrderItems = async ({ filterObjects, selectStringArray = [] }) => {
    const select =
      selectStringArray.length === 0 ? this._selectAll : selectStringArray;
    return await queryGetResultError({
      tableName: this._oiTbName,
      selectArray: select,
      whereObjects: filterObjects,
    });
  };
  // getAllOrderItemsWithProductByOrderId = async ({orderId}) => {
  //   try {
  //     const result = await db({
  //       oi: this._oiTbName,
  //       p: pModel._productTbName,
  //     }).select({
  //       [this._oiId]: `oi.${this._oiId}`,
  //       [this._oiPrice]: `oi.${this._oiPrice}`,
  //       [this._oiQty]: `oi.${this._oiQty}`,
  //       [this._orderId]: `oi.${this._orderId}`,
  //       [this._productId]: `oi.${this._orderId}`,
  //       [pModel._productCode]: `oi.${this._productCode}`,
  //     });
  //   } catch (error) {}

  // };
  createOrderItem = async (data) => {
    return await mutationCreateResultError({
      tableName: this._oiTbName,
      data,
    });
  };
  updateOrderItem = async (data) => {
    return await mutationUpdateResultError({
      tableName: this._oiTbName,
      data,
      whereObjects: {
        [this._oiId]: data.order_item_id,
      },
    });
  };
  deleteOrderItem = async ({ order_item_id }) => {
    return await mutationDeleteResultError({
      tableName: this._oiTbName,
      whereObjects: {
        [this._oiId]: order_item_id,
      },
    });
  };
}

module.exports = new OrderItemsModel();
