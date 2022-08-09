import React from "react";

function Charvatar({
  backgroundColor = "#F7DC6F",
  text,
  width,
  height,
  color = "#000000",
  fontSize,
  borderRadius = "5px",
}) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ backgroundColor, width, height, borderRadius }}
    >
      <div
        className="flex justify-center items-center font-semibold"
        style={{ color, fontSize }}
      >
        <div>{text?.split(" ")[0].charAt(0)}</div>
      </div>
    </div>
  );
}

export default Charvatar;
