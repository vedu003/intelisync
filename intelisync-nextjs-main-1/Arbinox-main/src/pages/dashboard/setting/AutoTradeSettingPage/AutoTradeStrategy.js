import AppContext from "@/context/AppContext";
import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
const MainBox = styled("div")(({ theme }) => ({
  "& h3": {
    color: "#9090A3",
    fontWeight: "600",
  },
}));

const AutoTradeStrategy = ({
  autoTradeOffAPIHandler,
  setDirectStatus,
  directStatus,
  switch1,
  setswitch1,
}) => {
  const auth = useContext(AppContext);

  // direct
  // const [directStatus, setDirectStatus] = useState(false);
  const handleChange = (event) => {
    if (event.target.checked) {
      setDirectStatus(event.target.checked);
    } else {
      autoTradeOffAPIHandler("Direct");
      setDirectStatus(event.target.checked);
    }
  };
  useEffect(() => {
    if (auth.userData?.autoTrade?.direct) {
      setDirectStatus(true);
    }
  }, [auth.userData]);

  // Intra
  // const [switch1, setswitch1] = useState({
  //   Intra: false,
  //   Triangular: false,
  // });
  const handleChangeSwitch1 = (event) => {
    if (event.target.checked) {
      setswitch1({ ...switch1, [event.target.name]: event.target.checked });
    } else {
      autoTradeOffAPIHandler(event.target.name);
      setswitch1({ ...switch1, [event.target.name]: event.target.checked });
    }
  };
  useEffect(() => {
    if (auth.userData?.autoTrade?.intraSingleExchange) {
      setswitch1({ ...switch1, ["Intra"]: true });
    }
    if (auth.userData?.autoTrade?.triangular) {
      setswitch1({ ...switch1, ["Triangular"]: true });
    }
  }, [auth.userData]);

  // Triangular
  // const [switch2, setswitch2] = useState({
  //   Triangular: false,
  // });
  // const handleChangeSwitch2 = (event) => {
  //   setswitch2({ ...switch2, [event.target.name]: event.target.checked });
  // };

  return (
    <MainBox>
      <Box>
        <Paper elevation={2}>
          <Box /* className="displaySpacebetween" */>
            <Typography variant="h3" color="primary">
              Strategy
            </Typography>
            <Box mt={2} className="displaySpacebetween">
              <Typography>Direct Arbitrage</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={directStatus}
                    onChange={handleChange}
                    name="direct"
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
                    checked={switch1.Intra}
                    onChange={handleChangeSwitch1}
                    name="Intra"
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
                    checked={switch1.Triangular}
                    onChange={handleChangeSwitch1}
                    name="Triangular"
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

export default AutoTradeStrategy;
