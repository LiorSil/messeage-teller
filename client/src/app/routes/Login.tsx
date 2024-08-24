import { Link } from "react-router-dom";
import FormWrapper from "./FormWrapper";
import useLoginForm from "../../hooks/useLoginForm";
import Loading from "../../shared/Loading";
import Button from "../../shared/Button";

type Props = {
  headline: string;
};

const Login = (props: Props) => {
  const { register, handleSubmit, onSubmit, errors, loading, error } =
    useLoginForm();

  return (
    <FormWrapper headline={props.headline}>
      {loading && <Loading />}
      {error && (
        <p className="bg-app-palette-cool-gray-+90 border-2 border-red-600 text-red-500 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="app-form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="app-form-input"
            placeholder="your@email.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between space-x-6 md:space-x-16 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-app-palette-muted-turquoise--60 focus:ring-app-palette-muted-turquoise--30 focus:outline-none"
              defaultChecked
            />
            <label
              htmlFor="remember"
              className="ml-2 inline-block text-base text-app-palette-muted-turquoise--60 whitespace-nowrap"
            >
              Remember me
            </label>
          </div>
          <Link
            className="inline-block text-base text-app-palette-muted-turquoise--60 hover:text-app-palette-muted-turquoise-+50 whitespace-nowrap"
            to={"/register"}
          >
            Create Account
          </Link>
        </div>

        <Button type="submit">Login</Button>
      </form>

      <Link
        to={"/chat-room"}
        className="mt-4 bottom-4 text-app-palette-muted-turquoise--60 hover:text-app-palette-muted-turquoise-+50"
      >
        Chat-Room
      </Link>
    </FormWrapper>
  );
};

export default Login;
