import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderExApiSlice, useGetAllOrdersQuery } from "./ordersApiSlice";
import OrderCard from "./components/OrderCard";
import { selectAllOrderIds } from "./ordersSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const orderIds = useSelector(selectAllOrderIds);

  useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true });
  const renderOrders = orderIds.map((id) => (
    <OrderCard key={id} orderId={id} />
  ));
  useEffect(() => {
    // dispatch(orderExApiSlice.endpoints.getAllOrders.initiate());
  }, []);
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
