import React from "react";
import { Link, useLocation } from "react-router-dom";
import CurrencyFormatter from "../../../components/CurrencyFormatter";

const ProductCard = ({ product }) => {
  const location = useLocation();

  const { product_id, product_name, product_file_uri, product_price } = product;

  const path =
    location.pathname === "/"
      ? `product/details/${product_id}`
      : `details/${product_id}`;

  let file_name = product_file_uri
    ? product_file_uri.replace("/public/", "")
    : "";

  return (
    <Link to={path}>
      <div className="mb-4 w-full h-96 sm:h-142 grid grid-rows-12 bg-white rounded-md overflow-hidden shadow-md">
        <div className="row-span-9 sm:row-span-10 flex justify-center items-center">
          {product_file_uri ? (
            <img
              className="w-full h-full bg-gray-50 object-contain sm:object-cover object-center overflow-hidden "
              src={`/api/files-resized/${file_name}?h=500`}
              alt={product_name}
            />
          ) : (
            <div className="flex justify-center items-center bg-gray-300 overflow-hidden ">
              <h6>No Image</h6>
            </div>
          )}
        </div>

        <div className="p-2 row-span-3 sm:row-span-2">
          <p className="text-gray-600 text-sm font-semibold">Tech Haven</p>
          <p className="mt-2 pt-2 text-blue-700 font-bold text-lg ">
            <CurrencyFormatter amount={product_price} currency="IQD" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
