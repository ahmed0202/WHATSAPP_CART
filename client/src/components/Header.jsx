import React from "react";
import CategoryList from "../features/categories/CategoryList";

import SelectCategoryAction from "./SelectCategoryAction";
import { Link, useNavigate } from "react-router-dom";
import SelectProductAction from "./SelectProductAction";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, sign_out } from "../features/auth/authSlice";
import Cookies from "js-cookie";
import Button from "./Button";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(selectCurrentToken);

  const handleSignOut = () => {
    try {
      dispatch(sign_out());
      Cookies.remove("email");
      Cookies.remove("token");
      navigate("/");
    } catch (error) {}
  };
  return (
    <header className="px-4 pt-4 pb-2 sm:px-16 sm:pt-8 sm:pb-4 border-b shadow-lg">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="pb-4 sm:pb-10 text-2xl sm:text-4xl text-blue-800 font-bold ">
            <Link to="/">Tech Haven</Link>
          </h1>
        </div>
        <ul className="flex flex-wrap justify-center space-x-4">
          {isAuthorized != null ? (
            <>
              <li>
                <SelectCategoryAction />
              </li>
              <li>
                <SelectProductAction />
              </li>
              <li>
                <Link to="/orders">
                  <h6 className="mt-0 sm:mt-2 text-base sm:text-base text-blue-600 underline underline-offset-1 ">
                    Orders
                  </h6>
                </Link>
              </li>
              <li></li>
            </>
          ) : (
            <Link to="/cart">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z"
                  stroke="#183AA7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z"
                  stroke="#183AA7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.05005 2.04999H4.05005L6.71005 14.47C6.80763 14.9248 7.06072 15.3315 7.42576 15.6198C7.7908 15.9082 8.24495 16.0603 8.71005 16.05H18.49C18.9452 16.0493 19.3865 15.8933 19.7411 15.6078C20.0956 15.3224 20.3422 14.9245 20.4401 14.48L22.09 7.04999H5.12005"
                  stroke="#183AA7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </ul>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-10">
          <CategoryList />
        </div>
        <div className="col-span-2 flex justify-end">
          {isAuthorized != null ? (
            <button
              className="text-xs sm:text-sm text-red-600 underline underline-offset-1 "
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth/signin">
              <h6 className="text-xs sm:text-sm text-blue-600 underline underline-offset-1 ">
                SignIn
              </h6>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
