import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Paper,
  Checkbox,
  Divider,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Form, Formik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { calculateTimeLeft } from "@/utils";
import CustomHead from "@/components/CustomHead";
import moment from "moment";
import AppContext from "@/context/AppContext";
import { MdOutlineMail } from "react-icons/md";

const SignupComponent = styled("div")(({ theme }) => ({
  height: "100%",
  position: "relative",
  zIndex: "999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
  },
  "& h6": {
    fontSize: "45px !important",
  },
  "& .Mui-checked": {
    color: "#ffffff",
  },
  "& .loginBox": {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "640px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "& .mainBox": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
      padding: "40px",
      [theme.breakpoints.down("xs")]: {
        padding: "20px",
      },
    },
  },
}));

export default function Signup() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const loginDataParse = window.localStorage.getItem("loginData");
  useEffect(() => {
    if (loginDataParse) {
      setIsRemember(true);
    }
  }, [loginDataParse]);
  const formInitialSchema = {
    email: loginDataParse ? JSON.parse(loginDataParse).email : "",
    password: loginDataParse ? JSON.parse(loginDataParse).password : "",
  };
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email.")
      .max(256, "Should not exceeds 256 characters.")
      .required("Email is required."),
    password: yup
      .string()
      .trim()
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Please enter a valid password."
      // )
      .required("Password is required.")
      .max(18, "Password should not exceed 18 characters.")
      .min(8, "Password must be a minimum of 8 characters."),
  });

  const handleFormSubmit = async (values) => {
    const formData = {
      email: values.email.toLowerCase(),
      password: values.password,
    };
    try {
      setisLoading(true);
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.login,
        bodyData: formData,
      });
      if (response.data.responseCode === 200) {
        let obj = JSON.stringify(formData);
        window.localStorage.setItem("loginData", obj);
        // if (response.data.result.twoFA) {
        let endTime = moment().add(3, "m").unix();
        if (endTime) {
          const timeLefts = calculateTimeLeft(endTime * 1000);
          sessionStorage.setItem("otpTimer", JSON.stringify(timeLefts));
        }
        sessionStorage.setItem("previousRoute", router.asPath);
        router.push(`/auth/verify-otp?${values.email.toLowerCase()}`);
        // } else {
        //   auth.userLogIn(true, response.data.result?.token);
        //   window.sessionStorage.setItem("token", response.data.result?.token);
        //   router.replace("/dashboard");
        // }
      } else {
        toast.error(response.data.responseMessage);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <SignupComponent>
      <CustomHead
        title="Login | Me.Cap"
        description=""
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Box align="center" mb={5.4}>
          <Typography variant="h2" color="#fff" className="loginText">
            Login
          </Typography>
          <Typography variant="body1" color="#FFFFFF99" mt={2}>
            Don’t have an account? 
            <span
              style={{ color: "#8247FF", cursor: "pointer" }}
              onClick={() => router.push("/auth/sign-up")}
            >
              Sign Up
            </span>
          </Typography>
        </Box>
        <Formik
          initialValues={formInitialSchema}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <Box>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          sx={{
                            background: "transparent",
                            marginLeft: "4px",
                            padding: "1px",
                          }}
                          onClick={() => setShowPassword(!showPassword)} // You can handle password visibility toggle if needed.
                          edge="start"
                        >
                          <MdOutlineMail style={{ color: "#FFFFFF99" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    inputProps: {
                      style: { paddingLeft: "0px" },
                    },
                  }}
                />
                <FormHelperText error>
                  {touched.email && errors.email}
                </FormHelperText>
              </Box>
              <Box mt={3}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          sx={{
                            background: "transparent",
                            marginLeft: "4px",
                            padding: "1px",
                          }}
                          onClick={() => setShowPassword(!showPassword)} // You can handle password visibility toggle if needed.
                          edge="start"
                        >
                          <img src="/images/password.svg" alt="Key" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            background: "transparent",
                            marginRight: "0px",
                            padding: "1px",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <LuEye style={{ color: "#FFFFFF99" }} />
                          ) : (
                            <LuEyeOff style={{ color: "#FFFFFF99" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    inputProps: {
                      style: { paddingLeft: "0px" },
                    },
                  }}
                />
                <FormHelperText error>
                  {touched.password && errors.password}
                </FormHelperText>
              </Box>
              <Box
                className="agreeBox displaySpacebetween"
                mt={5.4}
                align="center"
              >
                <Box
                  style={{ marginLeft: "-8px" }}
                  className="displayStart"
                  onClick={() => !isLoading && setIsRemember(!isRemember)}
                >
                  <Checkbox checked={isRemember} defaultChecked />
                  <Typography variant="body1" color="#FFFFFFCC" ml={1}>
                    Remember me
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  color="primary"
                  style={{
                    textAlign: "center",

                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() =>
                    !isLoading && router.push("/auth/forgot-password")
                  }
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Box className="displayCenter" mt={5.4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  // disabled={isLoading}
                  disabled={isLoading || !values.email || !values.password}
                >
                  Log in
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </SignupComponent>
  );
}

Signup.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
