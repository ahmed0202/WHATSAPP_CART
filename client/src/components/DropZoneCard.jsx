import React from "react";

const DropZoneCard = ({ ...props }) => {
  const isDragActive = props.isDragActive;
  return isDragActive ? (
    <>
      <div className="p-4 flex items-center justify-center  bg-gray-200 border border-dashed border-gray-600 hover:bg-gray-300 hover:border-gray-900 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>

        <p className="text-xs">Drag File Here</p>
      </div>
    </>
  ) : (
    <>
      <div className="h-72 w-44 grid grid-rows justify-items-center bg-gray-200 hover:bg-gray-300 border border-dashed border-gray-400 hover:border-gray-500 ">
        <p className="p-4 text-xs text-gray-800">
          Drag drop file here, or click to select files.
        </p>

        <p className="px-4 text-xs text-gray-800">
          Only png and jpeg files type are supported.
        </p>

        <p className="px-4 py-2  text-xs text-black">
          Note: Only add images that cover at least 80% of the box, Otherwise
          the image would not be effictive as the one we recommending.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </div>
    </>
  );
};

export default DropZoneCard;
