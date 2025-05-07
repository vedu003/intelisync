import { api_configs } from "@/api-services";
import { verifyEmail } from "@/utils";
import { Loop } from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export function getRandomOperator() {
  const totalsValues = "+*";
  const randomIndex = Math.floor(Math.random() * totalsValues.length);
  return totalsValues[randomIndex];
}
const Recaptcha = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const [firstNumber, setFirstNumber] = useState(
    Math.floor(Math.random() * 10)
  );
  const [secondNumber, setSecondNumber] = useState(
    Math.floor(Math.random() * 10)
  );
  const [randomOperator, setRandomOperator] = useState(getRandomOperator());
  const [email, setemail] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");

  const onVerified = async (isVerified) => {
    try {
      if (!isVerified) {
        return;
      }
      setIsLoading(true);

      const res = await axios({
        method: "POST",
        url: api_configs.subscribe,
        data: {
          email: email,
        },
      });
      if (res.data.responseCode === 200) {
        setemail("");
        handleRefresh();
        setIsLoading(false);
        toast.success(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
        // setSubscribeListData([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.response.data.responseMessage);
      setemail("");
      handleRefresh();
    }
  };
  const handleRefresh = () => {
    setFirstNumber(Math.floor(Math.random() * 10));
    setSecondNumber(Math.floor(Math.random() * 10));
    setRandomOperator(getRandomOperator());
    setUserInput("");
    setError("");
    setIsSubmit(false);
    setTimeout(() => {
      setisLoading1(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let correctAnswer;
    switch (randomOperator) {
      case "+":
        correctAnswer = firstNumber + secondNumber;
        break;
      case "-":
        correctAnswer = firstNumber - secondNumber;
        break;
      case "*":
        correctAnswer = firstNumber * secondNumber;
        break;
      default:
        correctAnswer = 0;
    }
    setIsSubmit(true);
    if (email == "" || userInput == "") {
      setError("");
      return;
    }
    if (userInput === correctAnswer) {
      setError("Incorrect answer. Please try again.");
      return;
    }
    setError("");
    setIsSubmit(false);

    onVerified(true);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              // required
              autoComplete="off"
              inputProps={{ style: { textTransform: "lowercase" } }}
            />
            {isSubmit && email == "" && (
              <FormHelperText style={{ color: "red" }}>
                Email field is required.
              </FormHelperText>
            )}
            {isSubmit && email !== "" && !verifyEmail(email) && (
              <FormHelperText style={{ color: "red" }}>
                Enter a correct email.
              </FormHelperText>
            )}
          </Grid>{" "}
          <Grid item xs={12} sm={8}>
            <TextField
              placeholder="Enter captcha value"
              variant="outlined"
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              autoComplete="off"
              // required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="reCaptchaBox">
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#000",
                      }}
                    >
                      {firstNumber} {randomOperator} {secondNumber}
                    </Typography>
                    <IconButton
                      onClick={() => handleRefresh()}
                      sx={{ padding: "0 !important" }}
                    >
                      <Loop
                        className={isLoading1 ? "rotating-icon" : ""}
                        style={{ color: "#000" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {isSubmit && userInput == "" && (
              <FormHelperText style={{ color: "red" }}>
                Captcha value is required.
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="subscribeBox"
              style={{ borderRadius: "8px" }}
              type="submit"
              disabled={isLoading || isLoading1}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && (
        <FormHelperText style={{ color: "red" }}>{error}</FormHelperText>
      )}
    </Box>
  );
};

export default Recaptcha;
