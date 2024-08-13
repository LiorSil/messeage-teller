import { ReactNode } from "react";

const LoginWrapper = ({ children }: { children: ReactNode }) => {
  return (
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
            {children}
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
  );
};

export default LoginWrapper;
