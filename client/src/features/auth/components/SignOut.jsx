import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sign_out } from "../authSlice";
import Button from "../../../components/Button";
import Cookies from "js-cookie";

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  handleSignOut = async () => {
    try {
      dispatch(sign_out()).unwrap();
      Cookies.remove("email");
      Cookies.remove("accessToken");
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOut;
