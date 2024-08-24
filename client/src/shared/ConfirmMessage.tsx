import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

type Props = {
  message: string;
  confirmMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmMessage: React.FC<Props> = (props) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-app-palette-sap-green-light-+0 shadow-lg rounded-lg border-2 border-black text-center p-6">
        <h1 className="text-2xl font-bold text-gray-50">Confirm</h1>
        <p className="mt-4 text-gray-600">{props.message}</p>
        <div className="flex justify-center space-x-4">
          <Button
            type="button"
            className="mt-6 w-1/3 bg-red-800"
            onClick={props.onConfirm}
          >
            {props.confirmMessage}
          </Button>
          <Button
            type="button"
            className=" mt-6 w-1/3 "
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmMessage;
