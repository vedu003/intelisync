import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
const MainBox = styled("div")(({ theme }) => ({
  "& .MuiSelect-outlined": {
    border: "0px",
    color: "rgba(255, 255, 255, 0.75)",
  },
  "& h3": {
    color: "#9090A3",
    fontWeight: "600",
  },
}));

const AutoTradeWorking = () => {
  const [switch3, setswitch3] = useState({
    checkedA: false,
  });
  const handleChangeSwitch3 = (event) => {
    setswitch3({ ...switch3, [event.target.name]: event.target.checked });
  };

  const [select, setSelect] = React.useState("Seclect 1");
  const handleChangeSelect = (event) => {
    setSelect(event.target.value);
  };

  const [option, setOption] = React.useState("Seclect 2");
  const handleChangeOption = (event) => {
    setOption(event.target.value);
  };
  return (
    <MainBox>
      <Box>
        <Paper elevation={2}>
          <Box className="displaySpacebetween">
            <Typography variant="h3" color="primary">
              Working Mode
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={switch3.checkedA}
                  onChange={handleChangeSwitch3}
                  name="checkedA"
                  style={{ color: "#FF6905" }}
                />
              }
            />
          </Box>
          <Box mt={2}>
            <FormControl variant="standard">
              <Select
                id="demo-simple-select-outlined"
                value={select}
                onChange={handleChangeSelect}
                inputProps={{
                  "aria-label": "Without label",
                }}
              >
                <MenuItem value={"Exchange 1"}>
                  <Typography variant="body1" color="primary">
                    Exchange 1
                  </Typography>
                </MenuItem>
                <MenuItem value={"Exchange 2"}>
                  <Typography variant="body1" color="primary">
                    Exchange 2
                  </Typography>
                </MenuItem>
                <MenuItem value={"Exchange 3"}>
                  <Typography variant="body1" color="primary">
                    Exchange 3
                  </Typography>
                </MenuItem>
                <MenuItem value={"Exchange 4"}>
                  <Typography variant="body1" color="primary">
                    Exchange 4
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={1}>
            <FormControl variant="standard">
              <Select
                id="demo-simple-select-outlined"
                value={option}
                onChange={handleChangeOption}
                inputProps={{
                  "aria-label": "Without label",
                }}
              >
                <MenuItem value={"Exchange 1"}>
                  <Typography variant="body1" color="primary">
                    Exchange 1
                  </Typography>
                </MenuItem>
                <MenuItem value={"Exchange 2"}>
                  <Typography variant="body1" color="primary">
                    Exchange 2
                  </Typography>
                </MenuItem>
                <MenuItem value={"Exchange 3"}>
                  <Typography variant="body1" color="primary">
                    Exchange 3
                  </Typography>
                </MenuItem>
                <MenuItem value={"Exchange 4"}>
                  <Typography variant="body1" color="primary">
                    Exchange 4
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Box>
    </MainBox>
  );
};

export default AutoTradeWorking;
