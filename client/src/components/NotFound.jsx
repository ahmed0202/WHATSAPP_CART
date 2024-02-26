import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <center className="mt-10">
      <h1 className="text-2xl">Page Could Not Be Founded</h1>
      <h3 className="mt-5 underline underline-offset-1 text-blue-600">
        <Link to="/">Click Here To Go Home</Link>
      </h3>
    </center>
  );
};

export default NotFound;
