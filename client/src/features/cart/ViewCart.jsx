import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "./cartSlice";
import OrderItemList from "../orderItems/OrderItemList";
import { useGetOrderItemsQuery } from "../orderItems/orderItemsApiSlice";

import CartForm from "./components/CartForm";

const ViewCart = () => {
  const orderSelector = useSelector(selectCart);

  const { isError, isLoading, isSuccess } = useGetOrderItemsQuery(
    orderSelector.order_id
  );
  if (!orderSelector?.order_id) return <div>You have no item in cart</div>;
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>Error</div>;
  if (isSuccess)
    return (
      <div className="px-4 sm:px-8 md:px-16">
        <h1 className="my-14 text-3xl font-bold">My Cart</h1>
        <div className="lg:grid lg:grid-cols-12 ">
          <OrderItemList />

          <CartForm orderSelector={orderSelector} />
        </div>
      </div>
    );
};

export default ViewCart;
