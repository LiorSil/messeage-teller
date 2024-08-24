import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
      ></div>
      <p className="ml-2 text-white">Loading...</p>
    </div>
  );
};

export default Loading;
