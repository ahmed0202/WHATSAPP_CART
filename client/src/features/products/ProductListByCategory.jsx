import React from "react";
import { selectAllProducts } from "./productsSlice";
import { useSelector } from "react-redux";
import ProductCard from "./components/ProductCard";
import { useLocation } from "react-router-dom";
import { selectAllCategories } from "../categories/categoriesSlice";

const ProductListByCategory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("categoryName");
  const currentCategory = !categoryName
    ? "All"
    : `${
        categoryName.charAt(0).toUpperCase() +
        categoryName.slice(1).toLowerCase()
      }`;

  const categories = useSelector(selectAllCategories);
  const products = useSelector(selectAllProducts);

  const category = Boolean(categoryName)
    ? categories.filter(
        (category) => category.category_name.trim() === categoryName.trim()
      )
    : [];

  if (category.length === 0) return <div>Not Founded</div>;

  const filteredProducts = Boolean(categoryName)
    ? products.filter(
        (product) => product.category_id === category[0].category_id
      )
    : products;
  const renderProduct = filteredProducts.map((product) => (
    <ProductCard key={product.product_id} product={product} />
  ));
  return (
    <div className="px-4 pt-4 pb-2 sm:px-16 sm:pt-8 sm:pb-4">
      <div>
        <h2 className="text-2xl">{currentCategory}</h2>
        <p className="py-4 text-gray-400">
          {filteredProducts.length} items are listed
        </p>
      </div>
      <div className="py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {renderProduct}
      </div>
    </div>
  );
};

export default ProductListByCategory;
