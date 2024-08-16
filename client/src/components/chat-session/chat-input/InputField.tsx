import React from "react";

const InputField = () => {
  return (
    <input
      type="text"
      placeholder="Write your message!"
      className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
    />
  );
};

export default InputField;
