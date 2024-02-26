import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectCategoryAction = () => {
  const navigate = useNavigate();

  const handleSelected = (e) => {
    const selected = e.target.value;

    if (!selected) return;
    navigate(selected);
  };
  return (
    <div>
      <select
        id="category-action-selector"
        onChange={handleSelected}
        className="select"
        value="Category"
      >
        <option value="">Category</option>
        <option value="category/create">Create</option>
        <option value="category/edit">Edit</option>
      </select>
    </div>
  );
};

export default SelectCategoryAction;
