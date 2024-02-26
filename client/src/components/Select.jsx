import React from "react";

const Select = ({ variant, children, ...props }) => {
  const id = props.id ? props.id : props.name;

  return (
    <select {...props} id={id} className={"select " + props.className}>
      {children}
    </select>
  );
};

export default Select;
