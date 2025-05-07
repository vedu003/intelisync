import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
// import Checkbox from "@material-ui/core/Checkbox";
const MainBox = styled("div")(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    background: "rgba(255, 255, 255, 0.07)",
  },
  "& .MuiSelect-outlined.MuiSelect-outlined": {
    paddingRight: "50px",
  },
  "& .MuiOutlinedInput-adornedEnd": {
    padding: "0px",
  },
  "& .MuiSelect-outlined": {
    background: theme.palette.background.selectButton,
    border: "0px",
    // background: "#1F1F24",
  },
  "& h3": {
    color: "#9090A3",
    fontWeight: "600",
  },
  "& p": {
    fontWeight: "300",
  },
  "& .menuItemBox": {
    "& p": {
      fontWeight: "600",
    },
  },
}));

const RebalanceBot = () => {
  const [change, setChange] = React.useState("USDT");
  const handleChangeSelect = (event) => {
    setChange(event.target.value);
  };
  const [change2, setChange2] = React.useState("USDT");
  const handleChangeSelect2 = (event) => {
    setChange2(event.target.value);
  };
  const [change3, setChange3] = React.useState("USDT");
  const handleChangeSelect3 = (event) => {
    setChange3(event.target.value);
  };

  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
  });
  const handleCheckboxChange = (itemName) => (event) => {
    setCheckedItems({ ...checkedItems, [itemName]: event.target.checked });
  };
  return (
    <MainBox>
      <Box>
        <Paper elevation={2}>
          <Typography variant="h3" color="primary">
            Bot Limit
          </Typography>
          <Box mt={2}>
            <Typography
              style={{ marginTop: "16px", marginBottom: "8px" }}
              variant="body2"
              color="primary"
            >
              Min Investment
            </Typography>
            <FormControl variant="standard">
              <TextField
                variant="outlined"
                name="password"
                placeholder="500%"
                InputProps={{
                  endAdornment: (
                    <Select
                      className="menuItemBox"
                      id="demo-simple-select-outlined"
                      value={change}
                      onChange={handleChangeSelect}
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem value={"USDT"}>
                        <Typography variant="body1">USDT</Typography>
                      </MenuItem>
                      <MenuItem value={"ETC"}>
                        <Typography variant="body1">ETC</Typography>
                      </MenuItem>
                      <MenuItem value={"Exchange 3"}>
                        <Typography variant="body1">BTC</Typography>
                      </MenuItem>
                    </Select>
                  ),
                }}
              />
            </FormControl>
          </Box>
          <Box mt={1}>
            <Typography
              style={{ marginTop: "16px", marginBottom: "8px" }}
              variant="body2"
              color="primary"
            >
              Min Investment
            </Typography>
            <FormControl variant="standard">
              <TextField
                variant="outlined"
                name="password"
                placeholder="500%"
                InputProps={{
                  endAdornment: (
                    <Select
                      className="menuItemBox"
                      id="demo-simple-select-outlined"
                      value={change2}
                      onChange={handleChangeSelect2}
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem value={"USDT"}>
                        <Typography variant="body1">USDT</Typography>
                      </MenuItem>
                      <MenuItem value={"ETH"}>
                        <Typography variant="body1">ETH</Typography>
                      </MenuItem>
                      <MenuItem value={"BTC"}>
                        <Typography variant="body1">BTC</Typography>
                      </MenuItem>
                    </Select>
                  ),
                }}
              />
            </FormControl>
          </Box>
          <Box mt={1}>
            <Typography
              style={{ marginTop: "16px", marginBottom: "8px" }}
              variant="body2"
              color="primary"
            >
              Min Profit Per Trade
            </Typography>
            <FormControl variant="standard">
              <TextField
                variant="outlined"
                name="password"
                placeholder="500%"
                InputProps={{
                  endAdornment: (
                    <Select
                      className="menuItemBox"
                      id="demo-simple-select-outlined"
                      value={change3}
                      onChange={handleChangeSelect3}
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem value={"USDT"}>
                        <Typography variant="body1">USDT</Typography>
                      </MenuItem>
                      <MenuItem value={"ETH"}>
                        <Typography variant="body1">ETH</Typography>
                      </MenuItem>
                      <MenuItem value={"BTC"}>
                        <Typography variant="body1">BTC</Typography>
                      </MenuItem>
                    </Select>
                  ),
                }}
              />
            </FormControl>
          </Box>
          <Box mt={2}>
            <Typography
              variant="body2"
              color="primary"
              style={{ marginBottom: "8px" }}
            >
              Duration of rebalancing profit % to segregate
            </Typography>
            <TextField variant="outlined" name="password" placeholder="01:30" />
          </Box>
          <Box mt={2}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item1}
                    onChange={handleCheckboxChange("item1")}
                    color="#FF6905"
                  />
                }
                label={
                  <Typography variant="body2">
                    Fund to be extracted in USDT
                  </Typography>
                }
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item2}
                    onChange={handleCheckboxChange("item2")}
                    color="#FF6905"
                  />
                }
                label={
                  <Typography variant="body2">
                    Allow sniper auto trade
                  </Typography>
                }
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item3}
                    onChange={handleCheckboxChange("item3")}
                    color="#FF6905"
                  />
                }
                label={
                  <Typography variant="body2">
                    Rebalancing values all exchanges
                  </Typography>
                }
              />
            </Box>
          </Box>
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainBox>
  );
};

export default RebalanceBot;
