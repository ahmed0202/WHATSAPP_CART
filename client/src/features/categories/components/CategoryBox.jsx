import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryBox = ({ category }) => {
  const navigate = useNavigate();
  const name = category.category_name;
  return (
    <p
      key={category.category_id}
      className={`mt-2 sm:m-0 ${
        name !== "SALE%" ? "text-black" : "text-red-500"
      } text-xs sm:text-base font-normal`}
    >
      <button
        onClick={() => {
          navigate(`product?categoryName=${name}`);
        }}
      >
        {category.category_name}
      </button>
    </p>
  );
};

export default CategoryBox;
