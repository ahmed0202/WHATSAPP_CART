import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../authSlice";
import { Outlet } from "react-router-dom";
import NotFound from "../../../components/NotFound";

const RequireAuth = () => {
  const isAuthorized = useSelector(selectCurrentToken);
  return isAuthorized != null ? <Outlet /> : <NotFound />;
};

export default RequireAuth;
