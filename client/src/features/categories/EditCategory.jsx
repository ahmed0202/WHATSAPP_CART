import React, { useState } from "react";
import {
  selectAllCategories,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "./categoriesSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";

const EditCategory = () => {
  const navigate = useNavigate();
  const [updateCategory, { updateIsLoading }] = useUpdateCategoryMutation();
  const [deleteCategory, { deleteIsLoading }] = useDeleteCategoryMutation();

  const categories = useSelector(selectAllCategories);
  const [selected, setSelected] = useState();
  const [category, setCategory] = useState({
    category_id: "",
    category_name: "",
  });

  const onNameChanged = (e) =>
    setCategory({ ...category, category_name: e.target.value });

  const canSave =
    Boolean(category.category_name) &&
    Boolean(category.category_id) &&
    !updateIsLoading &&
    !deleteIsLoading;

  const hanldeUpdateCategory = async () => {
    if (!canSave) return;
    try {
      await updateCategory({
        ...category,
        category_name: category.category_name,
      }).unwrap();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!canSave) return;
    try {
      await deleteCategory({
        category_id: category.category_id,
      }).unwrap();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectCategory = (e) => {
    const index = e.target.value;
    if (!index) {
      setCategory({ category_id: "", category_name: "" });
      setSelected("");
      return;
    }
    setCategory(categories[index]);
    setSelected(index);
  };

  const renderCategories = categories.map(
    ({ category_id, category_name }, index) => {
      return (
        <option key={category_id} value={index}>
          {category_name}
        </option>
      );
    }
  );
  return (
    <div className="py-16 px-8 sm:px-72 grid grid-rows-3 items-center">
      <select
        id="selectCategory"
        className="select mb-8"
        onChange={handleSelectCategory}
        value={selected}
        autoFocus
      >
        <option value="">Select Category</option>
        {renderCategories}
      </select>
      <Input
        id="category_name"
        variant="input_label"
        onChange={onNameChanged}
        value={category.category_name}
        className={!Boolean(selected) ? "input-disabled" : ""}
        autoFocus={Boolean(selected)}
        disabled={!Boolean(selected)}
        hideLabel={!canSave}
        required
      >
        Category Name
      </Input>

      <div className="mt-4 flex justify-end">
        <Button
          variant="danger"
          className={!canSave ? "btn-disabled bg-gray-300" : ""}
          onClick={handleDeleteCategory}
        >
          Delete
        </Button>
        <hr className="ms-10 bg-transparent border-transparent" />
        <Button
          className={!canSave ? "btn-disabled" : ""}
          onClick={hanldeUpdateCategory}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditCategory;
