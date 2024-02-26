import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "./authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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
  const canSave =
    [user.email.length >= 6, user.password.length >= 6].every(Boolean) &&
    !pending;

  const handleSignUp = async () => {
    if (!canSave) return console.log(user);
    try {
      setPending(true);

      await dispatch(
        signUp({ email: user.email, password: user.password })
      ).unwrap();

      setUser({ email: "", password: "" });
      setPending(false);
      setErrorMessage(false);
      navigate("/auth/signin");
    } catch (error) {
      setPending(false);
      alert(`${error.message}`);
    }
  };

  return (
    <div className="my-6 mx-12 sm:my-12 sm:mx-40 lg:my-24 lg:mx-96">
      <h1 className="mb-2 text-2xl">SignUp</h1>
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
              <Link to="/auth/signin"> SignIn </Link>
            </span>
            here
          </p>
        </div>
        <div className="flex justify-end items-center">
          <Button
            className={!canSave ? "btn-disabled" : ""}
            onClick={handleSignUp}
            disabled={!canSave}
          >
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
