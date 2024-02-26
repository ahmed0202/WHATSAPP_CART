import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllCategories } from "../categories/categoriesSlice";
import { useDropzone } from "react-dropzone";
import Input from "../../components/Input";
import DropZoneCard from "../../components/DropZoneCard";
import FilePreviewCard from "../../components/FilePreviewCard";
import {
  selectProductById,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "./productsSlice";
import Button from "../../components/Button";
import TimeAgo from "../../components/TimeAgo";
import Select from "../../components/Select";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productSelector = useSelector((state) => selectProductById(state, id));
  const categories = useSelector(selectAllCategories);

  const ACCEPTABLE_FILE_MIME = "image/png, image/jpeg";

  const [updateProduct, { isUpdateLoading }] = useUpdateProductMutation();
  const [deleteProduct, { isDeleteLoading }] = useDeleteProductMutation();

  const [product, setProduct] = useState({});
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [productFile, setProductFile] = useState(true);
  // const [productStatus, setProductStatus] = useState(product?.product_status);
  const fileName = product?.product_file_uri
    ? product.product_file_uri.replace("/public/", "")
    : "";

  const canSave =
    [product?.category_id, product?.product_name, product?.product_price].every(
      Boolean
    ) &&
    !isUpdateLoading &&
    !isDeleteLoading &&
    file.length == 0
      ? product?.product_file_uri
      : Boolean(file.length);
  //handle file remove
  const handleRemovePreviewFile = (e) => {
    setPreview([]);
    setFile([]);
  };

  //handle create button
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!canSave) return console.log("cant upload", product);
    else if (!product?.product_file_uri && file.length == 0) {
      return console.log("cant upload", product);
    }
    try {
      const {
        product_id,
        category_id,
        product_name,
        product_code,
        product_price,
        product_status: productStatus,
      } = product;

      const product_status = productStatus ? 1 : 0;
      const formData = new FormData();

      if (file.length > 0) {
        formData.append("file", file[0]);
      }
      const stringifyProduct = JSON.stringify({
        product_id,
        category_id,
        product_name,
        product_code,
        product_price,
        product_status,
      });
      formData.append("product", stringifyProduct);

      await updateProduct(formData).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!canSave) return console.log("cant delete");
    try {
      await deleteProduct({ product_id: product.product_id }).unwrap();
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
    } else if (e.target.id === "product_status") {
      setProduct({
        ...product,
        [e.target.id]: e.target.checked,
      });
    } else {
      setProduct({
        ...product,
        [e.target.id]: e.target.value,
      });
    }
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

  useEffect(() => {
    setProduct(productSelector);
  }, [productSelector]);

  if (!product?.product_id) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <div className="p-8 pb-16 md:py-16 md:px-48 items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div>
            <h1 className="pb-8 text-2xl">Update Product</h1>
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
            <div className="my-2  grid grid-cols-1 lg:grid-cols-2 sm:gap-4 lg:gap-16 items-baseline">
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
          <div className="lg:col-end-4 flex justify-center items-center">
            {productFile && product?.product_file_uri ? (
              <div>
                <p className="text-gray-400 text-xs">This is Current Image</p>
                <div className="pt-6 sm:p-0 relative h-72 w-44">
                  <div className="flex justify-end absolute -top-2 left-32 z-10">
                    <Button
                      variant={"removeIconButton"}
                      file={{ name: product.product_file_uri }}
                      onClick={() => setProductFile(false)}
                    />
                  </div>
                  <div className="absolute">
                    <img
                      className="h-64 w-36 object-contain border border-black border-dashed"
                      src={`/api/files-resized/${fileName}?h-288`}
                      alt={product.product_name}
                    />
                  </div>
                </div>
              </div>
            ) : preview.length == 0 ? (
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
        <div className="my-5 sm:mb-5">
          <Button
            variant="toggle"
            id="product_status"
            onClick={handleInputChanges}
            defaultChecked={product.product_status}
            value={product.product_status}
          >
            Product Currently is{" "}
            {productSelector.product_status ? "Active" : "Inactive"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-baseline ">
          <p className="text-gray-400 text-xs">
            Created
            <TimeAgo timestamp={product.product_created_at} />
          </p>
          <br />
          <p className="text-gray-400 text-xs">
            Updated <TimeAgo timestamp={product.product_updated_at} />
          </p>
        </div>
        <div className="my-5  flex justify-around sm:justify-end ">
          <button
            onClick={handleDeleteProduct}
            className={`${!canSave ? "btn-disabled" : "btn-danger"} `}
            disabled={!canSave}
          >
            Delete
          </button>
          <hr className="m-4 bg-transparent border-transparent" />
          <button
            onClick={handleUpdateProduct}
            className={`${!canSave ? "btn-disabled" : "btn-primary"} `}
            disabled={!canSave}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
