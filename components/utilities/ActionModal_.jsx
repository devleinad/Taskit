import React from "react";

const ActionModal = ({ message }) => {
  return (
    <div
      className="fixed top-0 left-0 bg-overlay zindex-1001 w-full h-full flex items-center 
    justify-center overflow-x-hidden"
    ></div>
  );
};

export default ActionModal;
