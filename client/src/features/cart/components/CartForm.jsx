import React, { useEffect, useState } from "react";
import Label from "../../../components/Label";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import { selectOrderItemTotals } from "../../orderItems/orderItemsSlice";
import CurrencyFormatter from "../../../components/CurrencyFormatter";
import { useUpdateOrderMutation } from "../../orders/ordersApiSlice";
import sendCartToWhatsapp from "../../../services/sendCartToWahtsapp";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CartForm = ({ orderSelector }) => {
  const citiesTowns = {
    dhok: {
      towns: ["zakho", "dhok center", "rania"],
    },
    erbil: {
      towns: ["prdi", "erbil center"],
    },
    sulaymaniy: {
      towns: ["prdi", "shaqlawa"],
    },
    kirkuk: {
      towns: ["dubz", "kirkuk center"],
    },
    halabja: {
      towns: ["garmian", "halabja center"],
    },
  };
  const navigate = useNavigate();

  const orderItemsTotals = useSelector(selectOrderItemTotals);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const [order, setOrder] = useState(orderSelector);

  const canSave =
    [
      order?.order_city?.length > 0,
      order?.order_town?.length > 0,
      order?.order_phonenumber?.length == 10,
      order?.order_delivery_address?.length > 6,
    ].every(Boolean) && !isLoading;

  const handleUpdateOrder = async () => {
    if (!canSave) return console.log(order);
    try {
      const [data] = await updateOrder({
        order_id: order.order_id,
        order_city: order.order_city,
        order_town: order.order_town,
        order_delivery_address: order.order_delivery_address || "no address",
        order_phonenumber: order.order_phonenumber,
        order_comment: order?.order_comment || "no comment",
      }).unwrap();
      Cookies.set("cart", JSON.stringify(data));
      alert("Do you want to send your cart to seller with whatsapp");
      sendCartToWhatsapp({
        cart_link: window.location.href,
        order: data,
      });
      Cookies.remove("cart");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChanges = (e) => {
    if (e.target.id === "order_city") {
      setOrder({
        ...order,
        [e.target.id]: e.target.value,
        order_town: "",
      });
    } else {
      setOrder({
        ...order,
        [e.target.id]: e.target.value,
      });
    }
  };

  const renderCities = Object.entries(citiesTowns).map(([city, _]) => (
    <option key={city} value={city}>
      {city}
    </option>
  ));
  const renderTowns = (city) => {
    return citiesTowns[city].towns.map((town) => (
      <option key={town} value={town}>
        {town}
      </option>
    ));
  };
  useEffect(() => {
    if (orderItemsTotals.accumlatedQtyTotal === 0) {
      Cookies.remove("cart");
      setOrder({});
    }
  }, [orderItemsTotals.accumlatedQtyTotal]);
  if (!order?.order_id) return <div>Loading</div>;

  return (
    <div className="py-2 px-4 mt-4 h-max  lg:m-0 lg:col-span-4 rounded-lg border border-gray-300">
      <div className="mb-4">
        <h3 className="mt-2 text-base font-semibold">Summary Order</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Subtotal:</span>
          <span className="text-lg font-semibold">
            <CurrencyFormatter
              amount={orderItemsTotals.accumlatedAmountTotal}
              currency="IQD"
            />
          </span>
        </div>
      </div>
      <div className="p-2 bg-hix rounded-md">
        <h5 className="mb-2 text-bluish font-medium ">Delivery Info</h5>
        <div className="py-4 px-2 rounded-md bg-white">
          <div className="grid grid-cols-2">
            <div className="me-1">
              <Label variant="select_label" htmlFor="order_city">
                City
              </Label>
              <Select
                id="order_city"
                className={`w-full ${
                  order?.order_city?.length > 0
                    ? "text-black"
                    : "border-b-red-300"
                }`}
                value={order?.order_city || ""}
                onChange={handleInputChanges}
              >
                <option value="">Select City</option>
                {renderCities}
              </Select>
            </div>

            <div className="ms-1">
              <Label variant="select_label" htmlFor="order_town">
                Town
              </Label>
              <Select
                id="order_town"
                className={`w-full ${
                  order?.order_town?.length > 0
                    ? "text-black"
                    : "border-b-red-300"
                }`}
                value={order?.order_town || ""}
                onChange={handleInputChanges}
                disabled={!Boolean(order?.order_city)}
              >
                <option value="">Select Town</option>
                {Boolean(order.order_city)
                  ? renderTowns(order.order_city)
                  : null}
              </Select>
            </div>
          </div>
          <Input
            variant="input_label_border"
            id="order_delivery_address"
            className={`w-full ${
              order?.order_delivery_address?.length > 0
                ? ""
                : "border-b-red-300"
            }`}
            placeholder="Your delivery address here..."
            value={order.order_delivery_address || ""}
            onChange={handleInputChanges}
          >
            Address
          </Input>

          <Input
            variant="input_label_border"
            type="number"
            id="order_phonenumber"
            placeholder="7##-###-##-##"
            className={`w-full ${
              order?.order_phonenumber?.length !== 10 ? "border-b-red-300" : ""
            }`}
            value={order.order_phonenumber || ""}
            onChange={handleInputChanges}
            required
          >
            Phone number
          </Input>
          <Input
            variant="textarea"
            id="order_comment"
            placeholder="Your comment here"
            value={order.order_comment || ""}
            onChange={handleInputChanges}
          />
        </div>
      </div>
      {order?.order_status === "confirmed" ? (
        <Button
          className={`mt-4 w-full ${!canSave && "btn-disabled"}`}
          onClick={handleUpdateOrder}
        >
          Update Cart ({orderItemsTotals.accumlatedQtyTotal})
        </Button>
      ) : (
        <Button
          className={`mt-4 w-full ${!canSave && "btn-disabled"}`}
          onClick={handleUpdateOrder}
        >
          Buy Now ({orderItemsTotals.accumlatedQtyTotal})
        </Button>
      )}
    </div>
  );
};

export default CartForm;
