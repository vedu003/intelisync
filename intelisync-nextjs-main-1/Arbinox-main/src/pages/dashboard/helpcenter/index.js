import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
  Paper,
  Input,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import DashboardLayout from "@/layout/DashboardLayout";
import CustomHead from "@/components/CustomHead";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
// import "react-phone-input-2/lib/style.css";
import AppContext from "@/context/AppContext";
import Image from "next/image";
import { getRandomOperator } from "@/components/Recaptcha";
import { Loop } from "@mui/icons-material";

const HelpCenterStyle = styled("div")(({ theme }) => ({
  "& .loginBox": {
    // padding: "40px",
    "& .imgBox": {
      height: "440px",
      "@media(max-width:899px)": {
        display: "none",
      },
      "& .helpImg": {
        "@media(max-width:899px)": {
          display: "none",
        },
      },
    },
    "& .displayCenter": {
      "& .MuiButton-root": {
        width: "70%",
      },
    },
  },
}));

export default function HelpCenter() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [firstNumber, setFirstNumber] = useState(
    Math.floor(Math.random() * 10)
  );
  const [secondNumber, setSecondNumber] = useState(
    Math.floor(Math.random() * 10)
  );
  const [randomOperator, setRandomOperator] = useState(getRandomOperator());

  const [errorMessage, setError] = useState("");
  const handleRefresh = () => {
    setFirstNumber(Math.floor(Math.random() * 10));
    setSecondNumber(Math.floor(Math.random() * 10));
    setRandomOperator(getRandomOperator());
    // setUserInput("");
    setError("");
    setIsSubmit(false);
    setTimeout(() => {
      setisLoading1(false);
    }, 800);
  };
  const auth = useContext(AppContext);
  const formInitialSchema = {
    name: "",
    email: "",
    mobile: "",
    message: "",
    userInput: "",
  };
  const formValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required.")
      .max(256, "Should not exceed 256 characters."),
    mobile: yup
      .string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits.")
      .min(10, "Mobile number must be at least 10 characters.")
      .max(15, "Mobile number must not exceed 15 characters.")
      .required("Mobile number is required."),
    message: yup.string().required("Message is required."),
    userInput: yup.string().required("Captcha value is required."),
  });

  const onVerified = async (values, resetForm) => {
    setIsLoading(true);
    try {
      // addContactUs
      const bodyData = {
        email: values.email.toLowerCase(),
        name: values.name,
        mobileNumber: values.mobile?.toString(),
        message: values.message,
      };
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.addContactUs,
        bodyData: bodyData,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        handleRefresh();
        resetForm({
          values: {
            mobile: "+44",
            name: "",
            email: "",
            userInput: "",
            message: "",
          },
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values, resetForm) => {
    // e.preventDefault();

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
    if (values.userInput !== correctAnswer) {
      setError("Incorrect answer. Please try again.");
      return;
    }
    setError("");
    setIsSubmit(false);
    onVerified(values, resetForm);
  };

  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        <Image
          height={24}
          width={24}
          quality={100}
          src="/images/headphones-02.svg"
          style={{ marginRight: "6px" }}
        />
        <Typography variant="h3" color="primary" whiteSpace="pre">
          Help Center
        </Typography>
      </Box>
    );
  }, []);

  return (
    <HelpCenterStyle>
      <CustomHead
        title="Contact Us | Me.Cap"
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Paper elevation={2}>
        <Grid container spacing={2} className="loginBox">
          <Grid item xs={12} sm={10} md={5}>
            <Box>
              <Typography variant="h3" color="primary" mb={5}>
                Contact Us
              </Typography>
            </Box>
            <Formik
              initialValues={formInitialSchema}
              validationSchema={formValidationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values, resetForm);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                setFieldValue,
                touched,
                values,
              }) => (
                <Form>
                  <Box>
                    <Box mt={3}>
                      <Typography variant="h6" color="#FFFFFFCC" mb={1}>
                        Name
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Enter name..."
                      type="text"
                      name="name"
                      value={values.name}
                      error={Boolean(touched.name && errors.name)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        textTransform: "lowerCase",
                      }}
                    />
                    <FormHelperText error>
                      {touched.name && errors.name}
                    </FormHelperText>
                  </Box>
                  <Box>
                    <Box mt={3}>
                      <Typography variant="h6" color="#FFFFFFCC" mb={1}>
                        Email
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Enter email address..."
                      type="text"
                      name="email"
                      value={values.email.toLowerCase()}
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{ style: { textTransform: "lowercase" } }}
                    />
                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Box>
                  <Box>
                    <Box mt={3}>
                      <Typography variant="h6" color="#FFFFFFCC" mb={1}>
                        Mobile Number
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Enter mobile number..."
                      type="number"
                      name="mobile"
                      value={values.mobile}
                      error={Boolean(touched.mobile && errors.mobile)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.mobile && errors.mobile}
                    </FormHelperText>
                  </Box>
                  <Box>
                    <Box mt={3}>
                      <Typography variant="h6" color="#FFFFFFCC" mb={1}>
                        Message
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Enter message..."
                      type="text"
                      multiline
                      rows={2}
                      name="message"
                      value={values.message}
                      error={Boolean(touched.message && errors.message)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.message && errors.message}
                    </FormHelperText>
                  </Box>
                  <Box>
                    <Box mt={3}>
                      <Typography variant="h6" color="#FFFFFFCC" mb={1}>
                        Captcha
                      </Typography>
                    </Box>
                    <TextField
                      placeholder="Enter captcha value"
                      variant="standard"
                      type="number"
                      name="userInput"
                      value={values.userInput}
                      error={Boolean(touched.userInput && errors.userInput)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                      // required
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className="reCaptchaBox1"
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#fff",
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
                                style={{ color: "#fff" }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText error>
                      {touched.userInput && errors.userInput}
                      {isSubmit &&
                        values.userInput != "" &&
                        errorMessage &&
                        errorMessage}
                    </FormHelperText>
                  </Box>
                  <Box className="displayCenter" mt={5}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      type="submit"
                      style={{ width: "78%" }}
                      disabled={isLoading}
                    >
                      Send {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={6}>
            <Box mt={5} className="imgBox imagebox-contact">
              <Image
                height={442}
                width={464}
                src="/images/contactUs.svg"
                alt="contactUs"
                className="helpImg"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </HelpCenterStyle>
  );
}

HelpCenter.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
