import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import useRegisterForm from "../../hooks/useRegisterForm";
import Loading from "../../components/Loading";
import FormWrapper from "./FormWrapper";

interface IFormInputs {
  email: string;
  password: string;
  phoneNumber: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, onSubmitHandler, error, loading, success } =
    useRegisterForm();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmitHandler(data);
  };

  useEffect(() => {
    if (success) {
      navigate("/chat-room");
    }
  }, [success, navigate]);

  return (
    <>
      <FormWrapper headline="Nice To Meet you">
        {loading && <Loading />}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block text-base font-medium text-app-palette-muted-turquoise--60 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border-2 border-app-palette-cool-gray--30 focus:outline-none focus:ring-offset-app-palette-muted-turquoise--60 focus:border-app-palette-muted-turquoise--60 text-app-palette-muted-turquoise--60"
              placeholder="your@email.com"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-base block font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-offset-app-palette-muted-turquoise--60 focus:border-app-palette-muted-turquoise--60"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tel"
              className="text-base block font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-offset-app-palette-muted-turquoise--60 focus:border-app-palette-muted-turquoise--60"
              placeholder="05x-xxx-xxxx"
              {...register("phoneNumber", {
                required: true,
              })}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white bg-app-palette-muted-turquoise--30 hover:bg-app-palette-muted-turquoise--50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-palette-cool-gray-+0"
          >
            Register
          </button>
        </form>

        <p className="text-base mt-4 text-app-palette-cool-gray--30">
          Already have an account?{" "}
          <Link
            className=" mt-4 bottom-4 font-semibold text-app-palette-muted-turquoise--60 hover:text-app-palette-muted-turquoise-+50"
            to="/login"
          >
            Login
          </Link>
        </p>
      </FormWrapper>
    </>
  );
};

export default Register;
