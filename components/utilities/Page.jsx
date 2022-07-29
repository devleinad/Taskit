import React from "react";

const Page = ({ pageNumber, onClick, isActive }) => {
  const handleClick = () => {
    onClick(pageNumber);
  };
  return (
    <div
      className={`flex justify-center items-center px-3 py-1 rounded cursor-pointer ${
        isActive ? "bg-blue-500 text-white" : "bg-white text-gray-500"
      }`}
      onClick={handleClick}
    >
      <span>{pageNumber}</span>
    </div>
  );
};

Page.defaultProps = {
  isActive: false,
  href: "#",
};

export default Page;
