import { Link } from "react-router-dom";
import LoginWrapper from "./LoginWrapper";

const Login = () => {
  return (
    <LoginWrapper>
      <div className="min-h-min flex items-center justify-center w-full">
        <div className=" bg-app-palette-sap-green-light-+10 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 text-app-palette-muted-turquoise--60">
            Welcome Back!
          </h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
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
                required
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
                required
              />
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

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-app-palette-muted-turquoise--30 hover:bg-app-palette-muted-turquoise--50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-palette-cool-gray-+0"
              onClick={() => alert("Hello")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;
