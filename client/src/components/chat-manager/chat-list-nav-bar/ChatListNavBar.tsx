import React, { useState } from "react";

const ChatListNavBar = () => {
  // State to manage the visibility of the navigation menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicks outside of the drawer
  const handleOutsideClick = (event) => {
    if (event.target.id === "backdrop") {
      toggleMenu();
    }
  };

  return (
    <nav className="relative border-black border-2 bg-app-palette-sap-green-light-+0  rounded-md m-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Flowbite
          </span>
        </a>
        <button
          onClick={toggleMenu} // Add the onClick handler here
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-app-palette-sap-green-light--20 focus:outline-none focus:ring-2 focus:ring-app-palette-sap-green-light--20  "
          aria-controls="navbar-hamburger"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* Backdrop */}
        {isOpen && (
          <div
            id="backdrop"
            className="fixed inset-0 bg-app-palette-muted-turquoise--10 bg-opacity-50 z-40"
            onClick={handleOutsideClick} // Close drawer on click
          ></div>
        )}
        {/* Drawer */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-app-palette-cool-gray-+0 border-gray-700 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
          id="navbar-hamburger"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-500 rounded "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700   hover:text-white"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-400 rounded  hover:bg-gray-700 hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ChatListNavBar;
