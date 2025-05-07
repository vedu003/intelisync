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
import React, { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { AiOutlineClose } from "react-icons/ai";
const MainComponent = styled("div")({
  "& .MuiFormControl-root": {},
  "& .MuiInput-input": {
    border: "1px solid rgba(0, 0, 0, 0.1019607843) !important",
    borderRadius: "12px",
    color: "#000",
  },
  "& .displayEnd": {
    display: "flex !important",
    justifyContent: "flex-end !important",
    width: "100% !important",
  },
});

const registerType = [
  { label: "Type 1" },
  { label: "Type 2" },
  { label: "Type 3" },
];
const selectoption2 = [
  { title: "Binance" },
  { title: "Kraken" },
  { title: "Gemini" },
  { title: "Bitfinex" },
];

export default function SettingAuthModal({ open, handleClose }) {
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
        <DialogContent sx={{ padding: "20px 12px" }}>
          <Typography variant="body1" color="#00000099" mt={2}>
            Select Exchnage
          </Typography>
          <Box
            mt={1}
            style={{
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            className="autocompleBox"
          >
            <Autocomplete
              freeSolo
              disableClearable
              fullWidth
              multiple
              limitTags={7}
              style={{ display: "flex", alignItems: "center" }}
              options={selectoption2.map((option) => option.title)} // Make sure this is returning an array
              onChange={(e, v) => {
                setFilterData((prev) => ({
                  ...prev,
                  startToken: v,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <InputAdornment position="end">
                        <ExpandMore style={{ color: "#00000066" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Typography variant="body1" color="#00000099" mt={3}>
            Select Cap in USDT
          </Typography>
          <Box mt={1}>
            <TextField placeholder="Enter here" variant="outlined" fullWidth />
          </Box>
        </DialogContent>
        <Box
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
            Save
          </Button>
        </Box>
      </Dialog>
    </MainComponent>
  );
}
