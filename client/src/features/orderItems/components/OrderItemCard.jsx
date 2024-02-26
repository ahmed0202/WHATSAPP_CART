import React from "react";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";

import { selectProductById } from "../../products/productsSlice";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { selectOrderItemById } from "../orderItemsSlice";
import {
  useDeleteOrderItemMutation,
  useUpdateOrderItemMutation,
} from "../orderItemsApiSlice";

const OrderItemCard = ({ id }) => {
  const orderItem = useSelector((state) => selectOrderItemById(state, id));
  const product = useSelector((state) =>
    selectProductById(state, orderItem.product_id)
  );

  const [updatedOrderItem] = useUpdateOrderItemMutation();
  const [deleteOrderItem] = useDeleteOrderItemMutation();

  const fileName = product?.product_file_uri?.replace("/public/", "");

  const handleUpadteOrderItemQty = async (number = 0) => {
    try {
      await updatedOrderItem({
        order_item_id: orderItem.order_item_id,
        order_item_qty: orderItem.order_item_qty + number,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteOrderItem = async () => {
    try {
      await deleteOrderItem({
        order_item_id: orderItem.order_item_id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pe-3 ps-1 py-2 mb-2 md:grid md:grid-cols-12  border border-gray-300 rounded-lg">
      <div className="col-span-3 flex justify-center ">
        <img
          className="rounded-md w-max h-full"
          src={`/api/files-resized/${fileName}?h=180`}
        />
      </div>
      <div className="col-span-6">
        <div className="md:grid md:grid-cols-12">
          <div className="ms-2 md:col-span-10 lg:col-span-8">
            <h1 className="text-2xl">{product?.product_name}</h1>
            <p className="mt-4 text-gray-500 text-xs ">
              {product.product_code}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="h-full md:grid md:grid-rows-12">
          <div className="md:h-full md:row-span-5"></div>
          <div className="h-full md:row-span-7">
            <div className="flex flex-col justify-end items-end">
              <p className="text-xs">{orderItem.order_item_qty}x</p>
              <p className="text-lg font-semibold">
                <CurrencyFormatter
                  amount={orderItem.order_item_price}
                  currency="IQD"
                />
              </p>
              <p className="text-gray-600 text-xs font-extralight">
                <CurrencyFormatter
                  amount={orderItem.order_item_price * orderItem.order_item_qty}
                  currency="IQD"
                />
              </p>
            </div>
            <div>
              <div className="mt-2 grid grid-cols-12">
                <div className="col-span-3">
                  <Button variant="trash" onClick={handleDeleteOrderItem} />
                </div>
                <div className="px-2  col-span-9 flex justify-between rounded-md border border-gray-300">
                  <Button
                    variant="minus"
                    onClick={() => handleUpadteOrderItemQty(-1)}
                  />
                  <span>{orderItem.order_item_qty}</span>
                  <Button
                    variant="plus"
                    onClick={() => handleUpadteOrderItemQty(1)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
