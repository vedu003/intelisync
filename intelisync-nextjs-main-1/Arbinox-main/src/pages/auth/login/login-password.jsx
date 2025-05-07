import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import TermComp from "@/components/TermComp";

const LoginComponent = styled(Box)(({ theme }) => ({
  height: "100%",
  position: "relative",
  zIndex: "999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  "& .loginBox": {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "698px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "& .mainBox": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
      padding: "30px",
      [theme.breakpoints.down("xs")]: {
        padding: "20px 10px 50px",
      },
      "& h2": {
        textAlign: "center",
        paddingBottom: "30px",
        [theme.breakpoints.down("xs")]: {
          paddingBottom: "2px",
        },
      },
    },
  },
}));

export default function LoginPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formInitialSchema = {
    password: "",
  };
  const formValidationSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Please enter a valid password."
      )
      .required("Password is required.")
      .max(16, "Password should not exceed 16 characters.")
      .min(8, "Password must be a minimum of 8 characters."),
  });
  const handleFormSubmit = async (values) => {
    router.push("/auth/otp-verification");
  };

  return (
    <LoginComponent>
      <Box className="loginBox">
        <Paper className="mainBox" elevation={2}>
          <Typography variant="h2" color="#fff">
            Enter Password
          </Typography>
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
                  <Box mt={2}>
                    <Typography variant="body2" color="#fff">
                      Password
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{
                              marginBottom: "7px",
                              background: "transparent",
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <HiEye style={{ color: "#585757" }} />
                            ) : (
                              <HiEyeOff style={{ color: "#585757" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    {touched.password && errors.password}
                  </FormHelperText>
                </Box>

                <Box mt={2} align="center">
                  <Button variant="contained" color="primary" type="submit">
                    Next
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
        <Box mt={1}>
          <TermComp isShow={true} />
        </Box>{" "}
      </Box>
    </LoginComponent>
  );
}

LoginPassword.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
