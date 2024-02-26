import React from "react";

const Label = ({ variant, children, ...props }) => {
  const id = props.id ? props.id : props.htmlFor;

  if (variant == "select_label") {
    return (
      <label
        {...props}
        htmlFor={id}
        className={"mb-2 text-gray-500 text-xs " + props.className}
      >
        {children}
      </label>
    );
  }
};

export default Label;
