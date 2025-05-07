import Image from "next/image";
import React from "react";

const Logo = (props) => {
  return (
    <img
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      src="/images/logo.svg"
      alt="Logo"
      {...props}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Logo;
