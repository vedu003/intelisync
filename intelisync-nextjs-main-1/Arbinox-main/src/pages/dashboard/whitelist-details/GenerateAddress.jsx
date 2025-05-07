import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import { api_configs } from "@/api-services";
import axios from "axios";
import { funConEx } from "@/utils";
import AppContext from "@/context/AppContext";
import Popup from "@/components/DynamicModel";
import Image from "next/image";

const FilterModalBox = styled(Box)(({ theme }) => ({
  position: "relative",

  "& .formControl": {
    "&.MuiMenu-list": {
      height: "300px",
      maxHeight: "300px",
      overflow: "auto",
    },
  },
  [theme.breakpoints.down("xs")]: {
    padding: "10px",
  },
  "& h6": {
    fontSize: "20px",
    fontWeight: "600",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    color: "#fff",
    "-webkit-text-fill-color": "#fff !important",
  },
  "& .MuiSelect-selectMenu": {
    fontSize: "16px",
  },
  "& .MuiInput-input": {
    padding: "17px 12px",
  },

  "& .textBox": {},

  "& .buttonBox": {
    padding: "24px 0 0px",
  },
}));

function GenerateAddress({ open, setOpen, callBack }) {
  const auth = useContext(AppContext);
  const [exchangeId, setExchangeId] = useState("0");
  const token = window.localStorage.getItem("user_token");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const HandleGenerate = async () => {
    try {
      setIsSubmit(true);
      if (exchangeId == "0") {
        return;
      }
      setIsSubmit(false);
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: api_configs.generateAddress,
        headers: {
          token: token,
        },
        data: {
          exchangeId: exchangeId,
        },
      });
      if (response.data.responseCode == 200) {
        setOpen(false);
        callBack();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const MenuProps = {
    PaperProps: {
      style: {
        background: "#000",
        maxHeight: 350, // Set the maximum height for the dropdown menu
        overflowY: "auto", // Enable vertical scrolling
      },
    },
  };
  return (
    <>
      <Popup
        maxWidth="sm"
        open={open}
        handleClose={() => {
          if (!isLoading) {
            setOpen(false);
          }
        }}
        isLoading={isLoading}
        title="Generate Whitelist Address"
        actions={[
          {
            label: "Cancel",
            onClick: () => setOpen(false),
            color: "secondary",
            variant: "contained",
          },
          {
            label: "Submit",
            onClick: HandleGenerate,
            color: "primary",
            variant: "contained",
            isLoading: isLoading,
          },
        ]}
      >
        <FilterModalBox>
          <Box mt={2}>
            <Typography variant="body2" color="primary">
              Generate Whitelist Address
            </Typography>

            <Box
              mt={1}
              style={{ width: "100%", position: "relative" }}
              className="autocompleBox"
            >
              <FormControl
                variant="standard"
                className="formControl"
                disabled={isLoading}
                fullWidth
              >
                <Select
                  value={exchangeId}
                  onChange={(e) => {
                    setExchangeId(e.target.value);
                  }}
                  // fullWidth
                  disabled={isLoading}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="0" disabled>
                    <Typography variant="body1" color="primary">
                      &nbsp; Choose your connected exchange
                    </Typography>
                  </MenuItem>
                  {auth?.connectedExchangeList &&
                    funConEx(auth?.connectedExchangeList)?.map((map, i) => {
                      return (
                        <MenuItem key={map?._id} value={map?._id}>
                          <Box
                            className="avtClx"
                            value={map?._id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              height={26}
                              width={26}
                              quality={100}
                              src={map?.img}
                              alt={map?.exchangeName}
                              style={{ height: "26px", width: "26px" }}
                            />

                            <span style={{ padding: "0 0 0 10px" }}>
                              {map?.exchangeName}
                            </span>
                          </Box>
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText error>
                  {isSubmit &&
                    exchangeId === "0" &&
                    "Please select an exchange"}
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
        </FilterModalBox>
      </Popup>
    </>
  );
}

export default GenerateAddress;
