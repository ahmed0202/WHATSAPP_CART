import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllCategories } from "../categories/categoriesSlice";
import { useDropzone } from "react-dropzone";
import Input from "../../components/Input";
import DropZoneCard from "../../components/DropZoneCard";
import FilePreviewCard from "../../components/FilePreviewCard";
import { useCreateProductMutation } from "./productsSlice";
import Select from "../../components/Select";
import Label from "../../components/Label";

const CreateProduct = () => {
  const defaultProductValue = {
    product_name: "",
    product_code: "",
    product_price: "",
    category_id: "",
  };
  const ACCEPTABLE_FILE_MIME = "image/png, image/jpeg";

  const navigate = useNavigate();

  const categories = useSelector(selectAllCategories);
  const [createProduct, { isError, isLoading, error }] =
    useCreateProductMutation();

  const [product, setProduct] = useState(defaultProductValue);
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);

  const canSave =
    [
      product.category_id,
      product.product_name,
      product.product_price,
      file.length,
    ].every(Boolean) && !isLoading;
  //handle file remove
  const handleRemovePreviewFile = (e) => {
    setPreview([]);
    setFile([]);
  };

  //handle create button
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!canSave) return console.log(product);
    try {
      const formData = new FormData();
      formData.append("file", file[0]);
      const stringifyProduct = JSON.stringify(product);
      formData.append("product", stringifyProduct);

      await createProduct(formData).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //handle user input
  const handleInputChanges = (e) => {
    if (e.target.id === "category_id" || e.target.id === "product_price") {
      setProduct({
        ...product,
        [e.target.id]: Number(e.target.value),
      });
      return;
    }
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  // when file droped then it will be add to preview and file
  const onDrop = useCallback((acceptedFile) => {
    let list = [];
    setFile(acceptedFile);

    acceptedFile.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        list.push({ file: fileReader.result, name: file.name });
        if (acceptedFile.length == list.length) setPreview(list);
      };
    });
  }, []);
  //drop zone package
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  //render categories to be choosed by user
  const renderCategories = categories.map(({ category_id, category_name }) => (
    <option key={category_id} value={category_id}>
      {category_name}
    </option>
  ));

  return (
    <>
      <div className="p-8 md:py-16 md:px-48 items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div>
            <h1 className="pb-8 text-2xl">Create Product</h1>
            <Input
              variant="input_label"
              id="product_name"
              type="text"
              className={`${
                product?.product_name?.length === 0
                  ? "border-b-red-300"
                  : "text-black"
              }`}
              onChange={handleInputChanges}
              value={product.product_name}
            >
              Name
            </Input>
            <Input
              variant="input_label"
              id="product_price"
              type="number"
              className={`${
                product?.product_price?.length === 0
                  ? "border-b-red-300"
                  : "text-black"
              }`}
              onChange={handleInputChanges}
              value={product.product_price}
              required
            >
              Price
            </Input>
            <div className="my-2  grid grid-cols-1 lg:grid-cols-2 sm:gap-4 lg:gap-16 items-baseline ">
              <Input
                variant="input_label"
                id="product_code"
                type="text"
                onChange={handleInputChanges}
                value={product.product_code}
              >
                Code
              </Input>

              <Select
                id="category_id"
                className={`h-max w-max ${
                  product.category_id ? "text-black" : "border-b-red-300"
                }`}
                value={product.category_id}
                onChange={handleInputChanges}
              >
                <option value="">Select Category</option>
                {renderCategories}
              </Select>
            </div>
          </div>
          <div className="lg:col-end-4">
            {preview.length == 0 ? (
              <div {...getRootProps()}>
                <input {...getInputProps()} accept={ACCEPTABLE_FILE_MIME} />
                <DropZoneCard isDragActive={isDragActive} />
              </div>
            ) : (
              <>
                {preview.map((file) => (
                  <FilePreviewCard
                    key={file.name}
                    file={file}
                    handleRemovePreviewFile={handleRemovePreviewFile}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCreateProduct}
            className={`mt-2 ${!canSave ? "btn-disabled" : "btn-primary"} `}
            disabled={!canSave}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
