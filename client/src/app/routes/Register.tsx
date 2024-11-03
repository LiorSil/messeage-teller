import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import useRegisterForm from "../../hooks/useRegisterForm";
import Loading from "../../shared/Loading";
import FormWrapper from "./FormWrapper";
import Button from "../../shared/Button";
import { AppDispatch } from "../../redux/store.ts";
import { useDispatch } from "react-redux";
import { initialError } from "../../redux/slices/authSlice.ts";

interface IFormInputs {
  email: string;
  password: string;
  phoneNumber: string;
}

const Register = () => {
  const { register, handleSubmit, onSubmitHandler, error, loading, success } =
    useRegisterForm();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(initialError());
    onSubmitHandler(data);
  };

  useEffect(() => {
    if (success) {
      navigate("/chat-room");
    }
  }, [success, navigate]);

  return (
    <>
      <FormWrapper headline={"Nice To Meet you"}>
        {loading && <Loading />}
        {error && (
          <p className="bg-app-palette-cool-gray-+90 border-2 border-red-600 text-red-500 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 ">
            <label htmlFor="email" className="app-form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="app-form-input"
              placeholder="your@email.com"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="app-form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="app-form-input"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tel" className="app-form-label">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="app-form-input"
              placeholder="05x-xxx-xxxx"
              {...register("phoneNumber", {
                required: true,
              })}
            />
          </div>

          <Button type="submit">Register</Button>
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
