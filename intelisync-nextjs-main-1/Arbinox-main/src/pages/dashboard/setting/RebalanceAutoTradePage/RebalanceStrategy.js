import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
const MainBox = styled("div")(({ theme }) => ({
  "& .MuiCheckbox-root": {
    color: "#FF6905",
  },
  "& h3": {
    color: "#9090A3",
    fontSize: "600",
  },
}));

const RebalanceStrategy = () => {
  const [state, setState] = useState({
    checkedA: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [switch1, setswitch1] = useState({
    checkedA: false,
  });
  const handleChangeSwitch1 = (event) => {
    setswitch1({ ...switch1, [event.target.name]: event.target.checked });
  };

  const [switch2, setswitch2] = useState({
    checkedA: false,
  });
  const handleChangeSwitch2 = (event) => {
    setswitch2({ ...switch1, [event.target.name]: event.target.checked });
  };
  return (
    <MainBox>
      <Box>
        <Paper elevation={2}>
          <Box>
            <Typography variant="h3" color="primary">
              Strategy
            </Typography>
            <Box mt={2} className="displaySpacebetween">
              <Typography>Direct Arbitrage</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    style={{ color: "#FF6905" }}
                  />
                }
              />
            </Box>
            <Box className="displaySpacebetween">
              <Typography>Intra Arbitrage</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={switch1.checkedA}
                    onChange={handleChangeSwitch1}
                    name="checkedA"
                    style={{ color: "#FF6905" }}
                  />
                }
              />
            </Box>
            <Box className="displaySpacebetween">
              <Typography>Triangular</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={switch2.checkedA}
                    onChange={handleChangeSwitch2}
                    name="checkedA"
                    style={{ color: "#FF6905" }}
                  />
                }
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </MainBox>
  );
};

export default RebalanceStrategy;
