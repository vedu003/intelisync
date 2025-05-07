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
  { title: "Coin 1" },
  { title: "Coin 2" },
  { title: "Coin 3" },
];

export default function DistributedModal({ open, handleClose }) {
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
          style={{ position: "absolute", right: "20px", top: "20px" }}
        >
          <AiOutlineClose
            fontSize="25px"
            style={{
              color: "#000",
              marginTop: "-4px",
              marginRight: "-14px",
            }}
          />
        </IconButton>
        <DialogContent sx={{ padding: "20px 12px" }}>
          <Box align="center">
            <Typography
              variant="h6"
              color="#000000"
              style={{ fontSize: "18px" }}
            >
              Distributed
            </Typography>
          </Box>

          <Typography variant="body1" color="#00000099" mt={2}>
            Select Exchnage
          </Typography>
          <Box
            mt={1}
            style={{ width: "100%", position: "relative" }}
            className="autocompleBox"
          >
            <Autocomplete
              freeSolo
              disableClearable
              fullWidth
              multiple
              limitTags={10}
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
            Enter Amount
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
            Submit
          </Button>
        </Box>
      </Dialog>
    </MainComponent>
  );
}
