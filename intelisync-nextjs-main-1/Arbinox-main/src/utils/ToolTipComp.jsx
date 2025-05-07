import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
    padding: "8px",
    "& .${tooltipClasses.arrow}": {
      color: "#fff",
      left: "50%", // Move the arrow to the center
      transform: "translateX(-50%)", // Adjust for the offset
    },
  },
});

export default function ToolTipComp({ title, children }) {
  return (
    <NoMaxWidthTooltip title={title} arrow>
      {children}
    </NoMaxWidthTooltip>
  );
}
