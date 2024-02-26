import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "./authSlice";
import Cookies from "js-cookie";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const canSave =
    [user.email.length >= 6, user.password.length >= 6].every(Boolean) &&
    !pending;

  const handleInputChanges = (e) => {
    if (e.target.id === "password") {
      e.target.value.length < 6
        ? setErrorMessage(true)
        : setErrorMessage(false);
    }
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignIn = async () => {
    if (!canSave) return console.log(user);
    try {
      setPending(true);

      const data = await dispatch(
        signIn({ email: user.email, password: user.password })
      ).unwrap();
      Cookies.set("email", `${data.email}`, { expires: 7 });
      Cookies.set("token", `${data.accessToken}`, { expires: 7 });

      setUser({ email: "", password: "" });
      setPending(false);
      setErrorMessage(false);
      navigate("/");
    } catch (error) {
      setPending(false);
      alert(`${error.message}`);
    }
  };

  return (
    <div className="my-6 mx-12 sm:my-24 sm:mx-40 lg:mx-96">
      <h1 className="mb-2 text-2xl">SignIn</h1>
      <hr className="mb-8" />
      <div className="sm:mx-16">
        <Input
          type="email"
          variant="input_label"
          id="email"
          value={user.email}
          onChange={handleInputChanges}
          required
          autoFocus
        >
          Email
        </Input>

        <Input
          type="password"
          variant="input_label"
          id="password"
          value={user.password}
          onChange={handleInputChanges}
          required
        >
          Password
        </Input>
        {errorMessage ? (
          <p className="-mt-3 text-sm text-red-600">
            password should be at least 6 character
          </p>
        ) : null}
      </div>
      <div className="mt-2 sm:mt-10 grid grid-cols-2">
        <div className="flex flex-wrap justify-start items-baseline">
          <p className="text-gray-600 text-sm">
            already have an account?
            <span className="text-blue-600 text-md underline underline-offset-2 hover:no-underline">
              <Link to="/auth/signup"> SignUp </Link>
            </span>
            here
          </p>
        </div>
        <div className="flex justify-end items-center">
          <Button
            className={!canSave ? "btn-disabled" : ""}
            onClick={handleSignIn}
            disabled={!canSave}
          >
            SignIn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
