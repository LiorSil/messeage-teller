import { ReactNode } from "react";
type Props = {
  headline: string;
};

const FormWrapper = ({
  children,
  headline,
}: {
  children: ReactNode;
  headline: Props["headline"];
}) => {
  return (
    <div className="bg-app-palette-sap-green-light-+40 font-open-sans h-screen ">
      <div className="w-full flex flex-wrap">
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex justify-center lg:justify-start pt-12 lg:pl-12 lg:-mb-24">
            <a
              href="/"
              className="text-4xl font-bold text-app-palette-muted-turquoise--30"
            >
              Brand
            </a>
          </div>
          <div className="flex flex-col justify-center lg:justify-start my-auto pt-8 lg:pt-0 px-8 lg:px-24 lg:px-32">
            <div className="min-h-min flex items-center justify-center w-full">
              <div className=" bg-app-palette-sap-green-light-+10 shadow-lg rounded-lg px-8 py-6  max-w-xl border-black border-2">
                <h1 className="font-assistant text-2xl font-bold text-center mb-4 text-app-palette-muted-turquoise--60">
                  {headline}
                </h1>
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden lg:block"
            src="https://images.unsplash.com/photo-1604881991405-b273c7a4386a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="brand"
          />
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
