import React from "react";
import { useNavigate } from "react-router-dom";

const SelectProductAction = () => {
  const navigate = useNavigate();

  const handleSelected = (e) => {
    const selected = e.target.value;

    if (!selected) return;
    navigate(selected);
  };
  return (
    <div>
      <select
        id="product-action-selector"
        onChange={handleSelected}
        className="select"
        value=""
      >
        <option value="">Product</option>
        <option value="product/create">Create</option>
      </select>
    </div>
  );
};

export default SelectProductAction;
