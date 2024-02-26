import React from "react";
import { useSelector } from "react-redux";
import { selectProductById } from "./productsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { selectCurrentToken } from "../auth/authSlice";
import { selectCartId } from "../cart/cartSlice";
import Cookies from "js-cookie";
import {
  useCreateOrderItemMutation,
  useGetOrderItemsQuery,
} from "../orderItems/orderItemsApiSlice";
import { useCreateOrderMutation } from "../orders/ordersApiSlice";
import { selectAllOrderItemIdProductId } from "../orderItems/orderItemsSlice";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useSelector((state) => selectProductById(state, id));
  const isAuthorized = useSelector(selectCurrentToken);
  const orderId = useSelector(selectCartId);
  useGetOrderItemsQuery(orderId);

  const orderItemProductId = useSelector(selectAllOrderItemIdProductId);

  const [createOrderItem, { isCreateOrderItemLoading }] =
    useCreateOrderItemMutation();
  const [createOrder, { isCreateOrderLoading }] = useCreateOrderMutation();

  const file_name = product?.product_file_uri?.replace("/public/", "");
  const isProductAlreadyInCart = orderItemProductId.filter(
    (productId) => productId === Number(id)
  );

  const handleCreateOrder = async () => {
    try {
      Cookies.remove("cart");
      const [data] = await createOrder().unwrap();

      Cookies.set("cart", JSON.stringify(data), { expires: 7 });
      return data.order_id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    let orderIdChecked = orderId;
    if (!orderId) {
      orderIdChecked = await handleCreateOrder();
    }
    try {
      await createOrderItem({
        order_id: orderIdChecked,
        product_id: product.product_id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  if (!product) return <div>404 Not founded</div>;
  return (
    <div className="mx-4 mt-8 sm:mx-14 sm:my-20 grid grid-cols-1 sm:grid-cols-3">
      <div className="col-span-2 flex justify-center">
        {product?.product_file_uri ? (
          <img
            className="w-max h-170 rounded-md object-center overflow-hidden "
            src={`/api/files-resized/${file_name}?w=600`}
            alt={product.product_name}
          />
        ) : (
          <center>
            <h1 className="text-4xl">No Image</h1>
          </center>
        )}
      </div>
      <div className="mx-2 sm:mx-8 col-span-1">
        <div className="flex sm:block">
          <p className="text-gray-400 text-xs">Product code:</p>
          <p className="ms-4 sm:m-0 text-gray-400 text-xs ">
            {product.product_code}
          </p>
        </div>
        <h1 className="text-black text-lg font-semibold">
          {product.product_name}
        </h1>
        <div className="mt-2 sm:mt-8">
          <p className="text-gray-400 text-xs ">Cash Price</p>
          <p className="text-blue-700  text-md">
            <CurrencyFormatter amount={product.product_price} currency="IQD" />
          </p>
          <hr className="my-4" />
        </div>
        {isAuthorized == null ? (
          isProductAlreadyInCart.length === 0 ? (
            <Button
              className="w-full"
              onClick={handleAddToCart}
              disabled={isCreateOrderLoading || isCreateOrderItemLoading}
            >
              ADD TO CART
            </Button>
          ) : (
            <Link to="/cart">
              <Button className="w-full">GO TO CART</Button>
            </Link>
          )
        ) : (
          <Button
            className="mt-4 w-full"
            onClick={() => navigate(`/product/edit/${id}`)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
