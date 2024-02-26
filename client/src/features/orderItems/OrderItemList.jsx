import React from "react";
import OrderItemCard from "./components/OrderItemCard";

import { useSelector } from "react-redux";
import { selectAllOrderItemIds } from "./orderItemsSlice";

const OrderItemList = () => {
  const orderItemIds = useSelector((state) => selectAllOrderItemIds(state));

  const renderOrderItems = orderItemIds.map((id) => {
    return <OrderItemCard key={id} id={id} />;
  });
  return <div className="lg:me-6 lg:col-span-8 ">{renderOrderItems}</div>;
};

export default OrderItemList;
