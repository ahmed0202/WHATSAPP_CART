import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "../../../components/TimeAgo";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { useSelector } from "react-redux";
import { selectOrderById } from "../ordersSlice";

const OrderCard = ({ orderId }) => {
  const order = useSelector((state) => selectOrderById(state, orderId));
  return (
    <Link to={`edit/${order.order_id}`}>
      <div className="mt-4  py-4 px-4 sm:px-6 shadow-md border border-solid rounded-lg text-center">
        <div>
          <h1 className="text-lg">
            #{order.order_id}{" "}
            <span className="text-xs text-gray-500 ">
              Ordered
              <TimeAgo timestamp={order.order_updated_at} />
            </span>
          </h1>
          <h3 className="text-xs text-gray-500 ">
            <span
              className={`${
                order.order_status === "pending"
                  ? "text-blue-600"
                  : "text-green-500 font-semibold"
              }`}
            >
              {order.order_status.toUpperCase() + " "}
            </span>
          </h3>
        </div>

        <div className="mt-2 w-full flex justify-around">
          <div className="grid-rows-2 text-center">
            <h1 className="text-base font-bold">{order.order_total_qty}</h1>
            <h3 className="text-xs text-gray-500 ">Total Items</h3>
          </div>
          <div className="grid-rows-2 text-center">
            <h1 className="text-base font-bold">
              <CurrencyFormatter amount={order.order_subtotal} currency="IQD" />
            </h1>
            <h3 className="text-xs text-gray-500 ">Total Amount</h3>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-start">
          <div className="text-center">
            <h1 className="text-sm">
              Phone number:{" "}
              <span className="text-sm">{order.order_phonenumber}</span>
            </h1>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-start">
          <div className="text-center">
            <h1 className="text-sm">
              Location:
              <span className="text-sm text-gray-500">
                {" "}
                {order.order_city} City, {order.order_town}
              </span>
            </h1>
          </div>
        </div>
        <div className="mt-4 flex  text-start items-baseline">
          <h1 className="text-sm">Comment: {"  "}</h1>
          <h3 className="text-xs text-gray-500 ">
            {order?.order_comment?.substring(0, 100) || "no comment"}
          </h3>
        </div>
        <div className="mt-2 w-full flex justify-end">
          <div className="grid-rows-2 text-center">
            <h3 className="text-xs text-gray-500 ">
              created <TimeAgo timestamp={order.order_created_at} />
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
