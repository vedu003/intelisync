// SortAddress.js
import React, { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { IconButton } from "@mui/material";
import { sortAddress } from ".";
import { Check } from "@mui/icons-material";
import toast from "react-hot-toast";

const SortAddress = ({ address, showFull, isShowEnd }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };

  return (
    <div
      style={
        showFull
          ? {}
          : {
              display: "flex",
              alignItems: "center",
              justifyContent: isShowEnd ? "flex-end" : "",
            }
      }
    >
      <span>{showFull ? address : sortAddress(address)}</span>
      <IconButton
        onClick={handleCopyClick}
        style={{
          // marginLeft: "10px",
          cursor: "pointer",
          border: "none",
          background: "transparent",
          height: 0,
          // width: isShowEnd ? 0 : "auto",

          padding: "12px 0 12px 17px",
          width: "34px",
        }}
        disabled={copied}
      >
        {copied ? <Check style={{ color: "#78e93c" }} /> : <LuCopy />}
      </IconButton>
    </div>
  );
};

export default SortAddress;
