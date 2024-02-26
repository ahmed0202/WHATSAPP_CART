import React, { useState } from "react";
import { useCreateCategoryMutation } from "./categoriesSlice";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

const CreateCategory = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [createCategory, { isLoading, error, isError }] =
    useCreateCategoryMutation();

  const canSave = Boolean(name) && !isLoading;

  const hanldeAddCategory = async () => {
    if (!canSave) return;
    try {
      await createCategory({ category_name: name }).unwrap();
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="py-24 px-8 grid grid-rows-2 items-center ">
      <div>
        <Input
          variant="input_label"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        >
          Category Name
        </Input>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={hanldeAddCategory}
          disabled={!canSave}
          className={`${!canSave ? "btn-disabled" : ""}`}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateCategory;
