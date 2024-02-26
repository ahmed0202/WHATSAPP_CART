import React from "react";
import { selectAllProducts, selectProductTotal } from "./productsSlice";
import { useSelector } from "react-redux";
import ProductCard from "./components/ProductCard";
import { useLocation } from "react-router-dom";
import { selectCurrentUser } from "../auth/authSlice";

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("categoryName");
  const currentCategory = !categoryName
    ? "All"
    : `${
        categoryName.charAt(0).toUpperCase() +
        categoryName.slice(1).toLowerCase()
      }`;

  const userEmail = useSelector(selectCurrentUser);
  const products = useSelector(selectAllProducts);
  const totalProduct = useSelector(selectProductTotal);

  const renderProduct = products.map((product) => (
    <ProductCard key={product.product_id} product={product} />
  ));

  return (
    <div className="px-4 pt-4 pb-2 sm:px-16 sm:pt-8 sm:pb-4">
      <div>
        <h2 className="text-2xl">{currentCategory}</h2>
        <p className="py-4 text-gray-400">{totalProduct} items are listed</p>
      </div>
      <div className="py-6 grid grid-cols-2 sm:grid-cols-4 2xl:grid-cols-8 gap-4">
        {renderProduct}
      </div>
    </div>
  );
};

export default ProductList;
