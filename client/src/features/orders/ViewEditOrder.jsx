import React from "react";
import { useSelector } from "react-redux";

import OrderItemList from "../orderItems/OrderItemList";

import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "./ordersApiSlice";
import OrderForm from "./components/OrderForm";
import { useGetOrderItemsQuery } from "../orderItems/orderItemsApiSlice";

const ViewEditOrder = () => {
  const { id } = useParams();

  const { isSuccess, data } = useGetOrderByIdQuery(id);

  useGetOrderItemsQuery(id);
  if (isSuccess)
    return (
      <div className="px-4 sm:px-8 md:px-16">
        <h1 className="my-14 text-3xl font-bold">My Cart</h1>
        <div className="lg:grid lg:grid-cols-12 ">
          <OrderItemList />
          <OrderForm orderSelector={data[0]} />
        </div>
      </div>
    );
};

export default ViewEditOrder;
