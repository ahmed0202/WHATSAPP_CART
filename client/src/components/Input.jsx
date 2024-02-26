import React from "react";

const Input = ({ variant, hideLabel = false, children, ...props }) => {
  const id = props.id ? props.id : props.name;

  if (variant === "input_label") {
    return (
      <div className="relative z-0 w-full mb-5 group">
        <input {...props} id={id} className={"input " + props.className} />
        <label htmlFor={id} className="label" hidden={hideLabel}>
          {children}
        </label>
      </div>
    );
  } else if (variant === "input_label_border") {
    return (
      <div>
        <label
          htmlFor={id}
          className="text-xs text-gray-500"
          hidden={hideLabel}
        >
          {children}
        </label>
        <input
          {...props}
          id={id}
          className={
            "p-2.5 w-full text-xs text-gray-900 rounded-md border border-gray-300 focus:outline-none  focus:border-blue-600 " +
            props.className
          }
        />
      </div>
    );
  } else if (variant === "textarea") {
    return (
      <textarea
        rows="4"
        {...props}
        id={id}
        className="mt-4 p-2 w-full text-xs text-gray-900 rounded-md border border-gray-300 focus:outline-none  focus:border-blue-600"
      />
    );
  }
};

export default Input;
