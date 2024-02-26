import React from "react";
import Button from "./Button";

const FilePreviewCard = ({ ...props }) => {
  const file = props.file;
  const handleRemovePreviewFile = props.handleRemovePreviewFile;

  return (
    <div className="pt-6 sm:p-0 relative h-72 w-44">
      <div className="flex justify-end absolute -top-2 left-32 z-10">
        <Button
          variant={"removeIconButton"}
          file={file}
          onClick={handleRemovePreviewFile}
        />
      </div>
      <div className="absolute">
        <img
          className="h-64 w-36 object-contain border border-black border-dashed "
          src={file.file}
        />
        <p className="px-2 py-1 text-xs md:text-sm text-center bg-gray-300 rounded-full ">
          {file.name.substring(0, 15)}
          {file.name.length >= 15 && "..."}
        </p>
      </div>
    </div>
  );
};

export default FilePreviewCard;
