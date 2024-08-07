import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import useRegisterForm from "../../hooks/useRegisterForm";
import Loading from "../../components/Loading";

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
      {loading && <Loading />}

      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="bg-app-palette-sap-green-light-+40 font-serif h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
              <a
                href="/"
                className="text-4xl font-bold text-app-palette-muted-turquoise--30"
              >
                Brand
              </a>
            </div>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p className="text-center text-3xl text-app-palette-muted-turquoise--30">
                Nice To Meet You!
              </p>
              <form
                className="flex flex-col pt-3 md:pt-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col pt-4">
                  <label htmlFor="email" className="text-lg">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    {...register("email", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="text-lg">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <label htmlFor="phone" className="text-lg">
                    Phone
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="tel"
                    id="phone"
                    placeholder="05x-xxx-xxxx"
                    {...register("phoneNumber", {
                      required: true,
                    })}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                >
                  Register
                </button>
              </form>
              <div className="text-center pt-12 pb-12">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link className="underline font-semibold" to="/login">
                    Login here!
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 shadow-2xl">
            <img
              className="object-cover w-full h-screen hidden md:block"
              src="https://images.unsplash.com/photo-1604881991405-b273c7a4386a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="brand"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
