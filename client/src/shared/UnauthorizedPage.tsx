import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-app-palette-sap-green-light-+40">
      <div className="m-4 p-6 bg-app-palette-sap-green-light-+0 shadow-lg rounded-lg border-2 border-black text-center">
        <h1 className="text-2xl font-bold text-gray-50">Unauthorized Access</h1>
        <p className="mt-4 text-gray-600">
          You do not have permission to view this page.
        </p>
        <div className="flex justify-center">
          <Button
            type="button"
            className="mt-6 w-2/3 " // This sets the button width to 50% of the parent div
          >
            <Link to="/login" className="w-full">
              Go To Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
