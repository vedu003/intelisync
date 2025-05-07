import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";

export default function DefalultRecaptcha({ onCaptchaVerified, isLoading }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setQuestion(`${num1} + ${num2}`);
    setAnswer(num1 + num2);
    setUserInput("");
    setError(false);
    setErrorMessage("");
    onCaptchaVerified(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setUserInput(value);

    if (!value) {
      setError(true);
      setErrorMessage("Please enter your answer");
      onCaptchaVerified(false);
      return;
    }

    const isValid = parseInt(value) === answer;
    setError(!isValid);
    setErrorMessage(isValid ? "" : "Incorrect answer, try again.");
    onCaptchaVerified(isValid);
  };

  return (
    <Box>
      <Typography variant="body1" color="secondary" mb={1}>
        RECAPTCHA: {question}
      </Typography>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Enter your answer"
        value={userInput}
        onChange={handleInputChange}
        error={error}
        disabled={isLoading}
        type="number"
        inputProps={{ min: 0, max: 99 }}
      />
      {error && errorMessage && (
        <FormHelperText error>{errorMessage}</FormHelperText>
      )}
    </Box>
  );
}

DefalultRecaptcha.propTypes = {
  onCaptchaVerified: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

DefalultRecaptcha.defaultProps = {
  isLoading: false,
};
