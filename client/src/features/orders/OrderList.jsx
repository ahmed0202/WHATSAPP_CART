import React from "react";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "./ordersApiSlice";
import OrderCard from "./components/OrderCard";
import { selectAllOrderIds } from "./ordersSlice";

const OrderList = () => {
  const orderIds = useSelector(selectAllOrderIds);

  useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true });
  const renderOrders = orderIds.map((id) => (
    <OrderCard key={id} orderId={id} />
  ));

  return (
    <div className="my-10 mx-4 sm:mx-40">
      <h1 className="text-xl">
        {orderIds.length} <span className="text-gray-500 text-sm">Orders</span>
      </h1>
      {renderOrders}
    </div>
  );
};

export default OrderList;
