import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { handleNegativeValue } from "@/utils";
const MainBox = styled("div")(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    background: "rgba(255, 255, 255, 0.07)",
  },

  "& .MuiSelect-outlined.MuiSelect-outlined": {
    paddingRight: "50px",
    color: "rgba(255, 255, 255, 0.4)",
  },
  "& .MuiOutlinedInput-adornedEnd": {
    padding: "0px",
  },
  "& .MuiSelect-outlined": {
    background: theme.palette.background.selectButton,
    border: "0px",
    // background:"#1F1F24"
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

const AutoTradeBotLimit = ({
  autoTradeData,
  setAutoTradeData,
  isSubmit,
  setisSubmit,
  autoTradeConnectAPIHandler,
  BotName,
  isDisabled,
}) => {
  const [isValidThreshold, setIsValidThreshold] = React.useState(true);
  const [formData, setFormData] = React.useState({
    capital: "",
    Minthreshold: "",
  });

  return (
    <MainBox>
      <Box>
        <Paper elevation={2}>
          <Typography variant="h3" color="primary">
            {BotName} Bot Limit
          </Typography>
          <Box mt={2}>
            <Typography
              style={{ marginTop: "16px", marginBottom: "8px" }}
              variant="body2"
              color="primary"
            >
              Amount per Trade
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                variant="standard"
                name="password"
                placeholder="Enter amount per trade"
                type="number"
                value={formData?.capital}
                disabled={isDisabled}
                onChange={(e, v) => {
                  setAutoTradeData({
                    fromExchange: autoTradeData.fromExchange,
                    toExchange: autoTradeData.toExchange,
                    toExchange1: autoTradeData.toExchange1,
                    capital: e.target.value,
                    threshold: autoTradeData.threshold,
                    Minthreshold: autoTradeData.Minthreshold,
                  });
                  setFormData({
                    capital: e.target.value,
                    Minthreshold: formData.Minthreshold,
                  });
                  setisSubmit(true);
                }}
                error={isSubmit && autoTradeData?.capital == ""}
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "*" ||
                    event?.key === "/"
                  ) {
                    event.preventDefault();
                  }
                }}
                onKeyDown={(event) => handleNegativeValue(event)}
              />
              <FormHelperText error className={classes.helperText}>
                {isSubmit
                  ? autoTradeData.capital === ""
                    ? "Capital is required."
                    : Number(autoTradeData?.capital) < Number(50)
                    ? "Capital should be greater than 50."
                    : ""
                  : ""}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box mt={1}>
            <Typography
              style={{ marginTop: "16px", marginBottom: "8px" }}
              variant="body2"
              color="primary"
            >
              Minimum Profit (USDT)
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                variant="standard"
                placeholder="Enter minimum profit"
                // placeholder="500%"
                type="number"
                value={formData?.Minthreshold}
                disabled={isDisabled}
                onChange={(e, v) => {
                  setAutoTradeData({
                    fromExchange: autoTradeData.fromExchange,
                    toExchange: autoTradeData.toExchange,
                    toExchange1: autoTradeData.toExchange1,
                    capital: autoTradeData.capital,
                    Minthreshold: e.target.value,
                    threshold: autoTradeData.threshold,
                  });
                  setFormData({
                    Minthreshold: e.target.value,
                    capital: formData.capital,
                  });
                  // setFormData({
                  //   capital: e.target.value,
                  //   Minthreshold: formData.Minthreshold,
                  // });
                  if (e.target.value > 100) {
                    setIsValidThreshold(false);
                  } else {
                    setIsValidThreshold(true);
                  }
                }}
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "*" ||
                    event?.key === "/"
                  ) {
                    event.preventDefault();
                  }
                }}
                onKeyDown={(event) => handleNegativeValue(event)}
              />
              {!isValidThreshold && autoTradeData.Minthreshold !== "" && (
                <FormHelperText error>Please enter valid value.</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                autoTradeConnectAPIHandler(BotName);
                setisSubmit(true);
              }}
              disabled={isDisabled}
            >
              Update
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainBox>
  );
};

export default AutoTradeBotLimit;
