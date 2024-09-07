import React from "react";

const InputField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (message: string) => void;
}) => {
  return (
    <input
      type="text"
      placeholder="Write your message!"
      className="flex-1 min-w-0  focus:outline-none focus:ring-0 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-l-md py-3 pl-3 border-0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default InputField;
