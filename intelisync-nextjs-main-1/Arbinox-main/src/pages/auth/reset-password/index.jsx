import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import CustomHead from "@/components/CustomHead";
import AppContext from "@/context/AppContext";
import { LiaKeySolid } from "react-icons/lia";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { SecurePassword } from "@/components/PasswordStrengthIndicator";

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
    color: "#fff",
  },
  "& .loginBox": {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "640px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "@media(max-width: 350px)": {
      maxWidth: "90%",
    },
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const formInitialSchema = {
    password: "",
    confirmPassword: "",
  };
  const formValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required.")
      .max(16, "Password should not exceed 16 characters.")
      .min(8, "Password must be a minimum of 8 characters.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Please enter a valid password."
      ),
    confirmPassword: yup
      .string()
      .required("Confirmation of your password is required.")
      .oneOf([yup.ref("password"), null], "Password must match."),
  });

  const handleFormSubmit = async (values) => {
    const formData = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    try {
      setisLoading(true);
      const response = await apiRouterCall({
        method: "PATCH",
        url: api_configs.resetPasswordU,
        bodyData: formData,
        token: router.query.query,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        router.replace("/auth/login");
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
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Box align="center" mb={5.4}>
          <Typography variant="h2" color="#fff" className="loginText">
            Reset Password
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
          {({
            errors,
            handleBlur,
            handleChange,
            touched,
            values,
            isValid,
            dirty,
          }) => (
            <Form>
              <Box>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LiaKeySolid
                          style={{ color: "#585757", fontSize: "25px" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
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
                {touched.password && Boolean(errors.password) && (
                  <SecurePassword password={values.password} />
                )}
                <FormHelperText error>
                  {touched.password && errors.password}
                </FormHelperText>
              </Box>
              <Box mt={4}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Confirm password"
                  type={showPassword1 ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  onBlur={handleBlur}
                  disabled={isLoading}
                  onChange={handleChange}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LiaKeySolid
                          style={{ color: "#585757", fontSize: "25px" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            background: "transparent",
                          }}
                          onClick={() => setShowPassword1(!showPassword1)}
                          edge="end"
                        >
                          {showPassword1 ? (
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
                  {touched.confirmPassword && errors.confirmPassword}
                </FormHelperText>
              </Box>

              <Box className="displayCenter" mt={5.4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={
                    isLoading ||
                    !(values.password && values.confirmPassword) ||
                    !isValid ||
                    values.password !== values.confirmPassword
                  }
                >
                  Next {isLoading && <ButtonCircularProgress />}
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
