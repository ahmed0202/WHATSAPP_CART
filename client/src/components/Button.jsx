import React from "react";

const Button = ({ variant, children, ...props }) => {
  if (variant === "danger") {
    return (
      <button {...props} className={"btn-danger " + props.className}>
        {children}
      </button>
    );
  } else if (variant === "removeIconButton") {
    const file = props.file;
    return (
      <button className="bg-transparent" onClick={props?.onClick}>
        <svg
          id={file?.name}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 bg-transparent  hover:bg-gray-200 rounded-full  text-red-400 hover:text-red-600 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    );
  } else if (variant === "toggle") {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" {...props} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">
          {children}
        </span>
      </label>
    );
  } else if (variant == "trash") {
    return (
      <button onClick={props?.onClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6H21"
            stroke="#F89494"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6"
            stroke="#F89494"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6"
            stroke="#F89494"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  } else if (variant == "minus") {
    return (
      <button onClick={props?.onClick}>
        <svg
          width="16"
          height="2"
          viewBox="0 0 16 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H15"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  } else if (variant == "plus") {
    return (
      <button onClick={props?.onClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5V19"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  } else {
    return (
      <button {...props} className={"btn-primary " + props.className}>
        {children}
      </button>
    );
  }
};
export default Button;
