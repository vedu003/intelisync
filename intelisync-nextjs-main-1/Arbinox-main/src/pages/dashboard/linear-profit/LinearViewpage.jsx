import {
  Box,
  Dialog,
  Button,
  DialogContent,
  Typography,
  styled,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { AiOutlineClose } from "react-icons/ai";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LivepageInternal from "./LivepageInternal";
const MainComponent = styled("div")({
  "& .MuiFormControl-root": {},
  "& .MuiInput-input": {
    border: "1px solid rgba(0, 0, 0, 0.1019607843) !important",
    borderRadius: "12px",
    color: "#000",
  },
  "& .MuiAccordion-root.Mui-expanded": {
    margin: "0px !important",
  },
  "& .MuiAccordionSummary-root": {
    background: "#FFFFFF1A !important",
    padding: "0px 12px",
    minHeight: "29px",
    borderRadius: "8px",
    margin: "0px 0 5px",
    "& p": {
      fontSize: "11px",
      fontWeight: "500",
      // color: ExecuteButtonType ? "#fff" : "rgba(255, 255, 255, 0.6)",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "#000",
    fontSize: "17px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "10px 0",
  },
  "& .MuiCollapse-wrapperInner": {
    paddingLeft: "0px",
  },
  "& .MuiAccordion-rounded:last-child": {
    borderRadius: "0px",
  },
  "& .MuiAccordionSummary-content.Mui-expanded ": {
    margin: "3px 0",
  },
  "& .MuiAccordionSummary-root.Mui-expanded ": {
    minHeight: "29px",
  },
  "& .trackbutton": {
    color: "#000",
  },
  "& .MuiAccordion-root::before": {
    background: "none",
  },
  "& .grayText": {
    color: "#000",
  },
  "& .accordinbottomText": {
    color: "#000",
    fontSize: "12px !important",
  },
  "& .displayEnd": {
    display: "flex !important",
    justifyContent: "flex-end !important",
    width: "100% !important",
  },
  "& .MuiAccordionSummary-root": {
    background: "#0000001A !important", // Adding `!important` to force it
    borderRadius: "8px",
  },
});

export default function LinearViewpage({ open, handleClose }) {
  const [filter, setFilter] = React.useState({
    registerType: "",
  });

  const [filterData, setFilterData] = React.useState({
    fromExchange: "",
    toExchange: "",
    startToken: [],
  });
  return (
    <MainComponent>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            right: "20px",
            top: "8px",
            background: "tranparent",
          }}
        >
          <AiOutlineClose
            fontSize="25px"
            style={{
              color: "#fff",
              marginTop: "-4px",
              marginRight: "-14px",
            }}
          />
        </IconButton>
        <DialogContent sx={{ padding: "20px 12px" }}>
          <LivepageInternal />
        </DialogContent>
        {/* <Box
          display="flex"
          justifyContent="center"
          marginTop="14px"
          marginBottom="10px"
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClose}
          >
            Submit
          </Button>
        </Box> */}
      </Dialog>
    </MainComponent>
  );
}
