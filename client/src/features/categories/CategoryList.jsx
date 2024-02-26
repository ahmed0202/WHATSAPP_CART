import React from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "./categoriesSlice";

import CategoryBox from "./components/CategoryBox";
const CategoryList = () => {
  const categories = useSelector(selectAllCategories);

  const renderCategories = categories.map((category) => (
    <CategoryBox key={category.category_id} category={category} />
  ));

  return (
    <>
      <div className="flex flex-row flex-wrap space-x-6">
        {renderCategories}
      </div>
    </>
  );
};

export default CategoryList;
