"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Checkbox,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import PrivacyModal from "@/layout/LoginLayout/PrivacyModal";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import LoginLayoutNew from "@/layout/LoginLayout/LoginLayoutNew";
import { toast } from "react-hot-toast";
import AppContext from "@/context/AppContext";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SecurePassword } from "@/components/PasswordStrengthIndicator";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { LiaKeySolid } from "react-icons/lia";
import Cookies from "js-cookie";
import { BiWorld } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import axios from "axios";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import moment from "moment";
import { calculateTimeLeft } from "@/utils";
import DefalultRecaptcha from "@/components/DefalultRecaptcha";

const SignupComponent = styled("div")(({ theme }) => ({
  "& .react-tel-input .country-list .country": {
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#2D2D2D",
    color: "#fff",
    "&:hover": {
      background: "#000000e3",
    },
  },
  "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
    {
      backgroundColor: "transparent !important",
    },
  "& .react-tel-input .selected-flag": {
    "&:hover": {
      backgroundColor: "none",
    },
    backgroundColor: "#202020",
  },
  "& .react-tel-input .selected-flag .arrow": {
    left: "20px",
  },
  "& .react-tel-input .country-list .country.highlight": {
    backgroundColor: "#000000e3",
  },
  "& .react-tel-input .flag-dropdown ": {
    backgroundColor: "transparent",
    //   borderRight: "1px solid #949494",
    border: "none",
    height: "44px",
    position: "absolute",
    top: "5px",
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    backgroundColor: "#FFFFFF06",
  },

  // position: "relative",
  // zIndex: "999",
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  // overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    marginBottom: "20px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px !important",
  },

  "& .loginBox": {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "640px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "180px",
    paddingBottom: "50px",
    height: " calc(100vh - 100px)",
    overflowY: "auto",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
      paddingBottom: "50px",
      width: "600px",
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
    "& .signupButoonBox": {
      margin: "12px 0",
      [theme.breakpoints.down("sm")]: {
        margin: "20px 0",
      },
    },
    "& span": {
      // color: "rgba(38, 38, 38,0.7)",
    },
    "& .mainBox": {
      padding: "30px",
      // overflow: "scroll",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
      [theme.breakpoints.down("xs")]: {
        padding: "20px 10px 50px",
      },
      "& h2": {
        textAlign: "center",
        paddingBottom: "0px",
        fontSize: "30px",
        fontWeight: "300",
        fontFamily: "'Sora', sans-serif",
        [theme.breakpoints.down("sm")]: {
          paddingBottom: "2px",
        },
      },
    },
    "& .displayBox": {
      paddingBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "10px",
      },
      "& .divider": {
        flex: "1",
        // borderColor: "rgba(255, 255, 255, 0.25)",
      },
      "& .orText": {
        margin: "0px 10px",
      },
    },
    "& .displayButton": {
      width: "100%",
      // maxWidth: " 416px",
      // margin: "auto",
      // paddingBottonm: "24px",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "14px",
      },
    },
    "& .MuiSelect-root": {
      height: "50px",
    },
    "& .agreeBox": {
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
      },
      "& p": {
        fontSize: "14px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "13px",
          paddingBottom: "5px",
        },
      },
      "& lable": {
        cursor: "pointer",
      },
      "& span": {
        paddingLeft: "9px",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      },
      "& a": {
        color: theme.palette.text.primary,
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
}));

const countries = [
  { id: "1", sortname: "AF", name: "Afghanistan" },
  { id: "2", sortname: "AL", name: "Albania" },
  { id: "3", sortname: "DZ", name: "Algeria" },
  { id: "4", sortname: "AS", name: "American Samoa" },
  { id: "5", sortname: "AD", name: "Andorra" },
  { id: "6", sortname: "AO", name: "Angola" },
  { id: "7", sortname: "AI", name: "Anguilla" },
  { id: "8", sortname: "AQ", name: "Antarctica" },
  { id: "9", sortname: "AG", name: "Antigua And Barbuda" },
  { id: "10", sortname: "AR", name: "Argentina" },
  { id: "11", sortname: "AM", name: "Armenia" },
  { id: "12", sortname: "AW", name: "Aruba" },
  { id: "13", sortname: "AU", name: "Australia" },
  { id: "14", sortname: "AT", name: "Austria" },
  { id: "15", sortname: "AZ", name: "Azerbaijan" },
  { id: "16", sortname: "BS", name: "Bahamas" },
  { id: "17", sortname: "BH", name: "Bahrain" },
  { id: "18", sortname: "BD", name: "Bangladesh" },
  { id: "19", sortname: "BB", name: "Barbados" },
  { id: "20", sortname: "BY", name: "Belarus" },
  { id: "21", sortname: "BE", name: "Belgium" },
  { id: "22", sortname: "BZ", name: "Belize" },
  { id: "23", sortname: "BJ", name: "Benin" },
  { id: "24", sortname: "BM", name: "Bermuda" },
  { id: "25", sortname: "BT", name: "Bhutan" },
  { id: "26", sortname: "BO", name: "Bolivia" },
  { id: "27", sortname: "BA", name: "Bosnia and Herzegovina" },
  { id: "28", sortname: "BW", name: "Botswana" },
  { id: "29", sortname: "BV", name: "Bouvet Island" },
  { id: "30", sortname: "BR", name: "Brazil" },
  { id: "31", sortname: "IO", name: "British Indian Ocean Territory" },
  { id: "32", sortname: "BN", name: "Brunei" },
  { id: "33", sortname: "BG", name: "Bulgaria" },
  { id: "34", sortname: "BF", name: "Burkina Faso" },
  { id: "35", sortname: "BI", name: "Burundi" },
  { id: "36", sortname: "KH", name: "Cambodia" },
  { id: "37", sortname: "CM", name: "Cameroon" },
  { id: "38", sortname: "CA", name: "Canada" },
  { id: "39", sortname: "CV", name: "Cape Verde" },
  { id: "40", sortname: "KY", name: "Cayman Islands" },
  { id: "41", sortname: "CF", name: "Central African Republic" },
  { id: "42", sortname: "TD", name: "Chad" },
  { id: "43", sortname: "CL", name: "Chile" },
  { id: "44", sortname: "CN", name: "China" },
  { id: "45", sortname: "CX", name: "Christmas Island" },
  { id: "46", sortname: "CC", name: "Cocos (Keeling) Islands" },
  { id: "47", sortname: "CO", name: "Colombia" },
  { id: "48", sortname: "KM", name: "Comoros" },
  { id: "49", sortname: "CG", name: "Congo" },
  { id: "50", sortname: "CD", name: "Congo The Democratic Republic Of The" }
];

export const PhoneLogoBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  height: "18px",
  width: "18px",
  top: "33%",
  left: "16px",
}));
export const PhoneInputBox = styled(FormControl)(({ theme }) => ({
  position: "relative",
  "& .react-tel-input .form-control": {
    width: "100%",
    color: theme.palette.text.secondary,
    height: "54.56px",
    background: "#1c1a1e",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    // paddingLeft: "13px !important",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "24px",
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.01071em",
    // color: #FFFFFF99;
    borderRadius: "8px",
  },
  "& .react-tel-input .country-list .country": {
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#2D2D2D",
    color: "#fff",
    "&:hover": {
      background: "#000000e3",
    },
  },
  "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
    {
      backgroundColor: "#28322b !important",
    },
  "& .react-tel-input .selected-flag": {
    backgroundColor: "#262626",
    "&:hover": {
      backgroundColor: "none",
    },
  },
  "& .react-tel-input .selected-flag .arrow": {
    left: "20px",
  },

  "& .react-tel-input .country-list .country.highlight": {
    background: "#000000e3 !important",
    fontSize: "16px",
  },
  "& .react-tel-input .flag-dropdown ": {
    backgroundColor: "transparent",
    border: "none",
    height: "44px",
    position: "absolute",
    top: "5px",
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    background: "#FFFFFF06",
    fontSize: "16px",
  },
  // },
  // "& .outlineborder2": {

  "& .react-tel-input .country-list .country": {
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#2D2D2D",
    color: "#fff",
    "&:hover": {
      background: "#000000e3",
    },
  },
  "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
    {
      backgroundColor: "transparent !important",
    },
  "& .react-tel-input .selected-flag": {
    // backgroundColor: "#202020",
    "&:hover": {
      backgroundColor: "none",
    },
  },
  "& .react-tel-input .selected-flag .arrow": {
    left: "20px",
  },

  "& .react-tel-input .country-list .country.highlight": {
    background: "#000000e3 !important",
    fontSize: "16px",
    display: "none",
  },
  "& .react-tel-input .flag-dropdown ": {
    backgroundColor: "transparent",
    display: "none",
    height: "44px",
    position: "absolute",
    top: "5px",
  },
  "& .MuiSelect-root": {
    height: "51px",
    backgroundColor: "transparent",
    color: "#fff",
    borderBottom: "1px solid rgba(255, 255, 255, 0.42)",
    "&:hover": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.87)",
    },
    "&.Mui-focused": {
      borderBottom: "2px solid #8247FF",
    }
  },
  "& .MuiSelect-icon": {
    color: "rgba(255, 255, 255, 0.54)",
  },
  "& .MuiMenuItem-root": {
    color: "#fff",
    backgroundColor: "#202020",
    "&:hover": {
      backgroundColor: "#2D2D2D",
    },
    "&.Mui-selected": {
      backgroundColor: "#8247FF",
    }
  },
  "& .MuiPaper-root": {
    backgroundColor: "#202020",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
}));
const countries1 = [
  { label: "United States", code: "US", phone: "1" },
  { label: "Canada", code: "CA", phone: "1" },
  { label: "Mexico", code: "MX", phone: "52" },
  // Add more countries as needed
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

export default function Signup() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const AcceptTerm_Condition = Cookies.get("AcceptTerm_Condition");
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(
    AcceptTerm_Condition == "ACCEPT" ? false : true
  );
  const [isAccepted, setisAccepted] = useState(AcceptTerm_Condition);

  const handleAcceptPrivacyPolicy = () => {
    setisAccepted("ACCEPT");
    // localStorage.setItem("AcceptTerm&Condition", "true");
    Cookies.set("AcceptTerm_Condition", "ACCEPT", { expires: 30 });
  };
  const handleDeclinePrivacyPolicy = () => {
    setisAccepted("DECLINE");
    // localStorage.setItem("AcceptTerm&Condition", "false");
    Cookies.set("AcceptTerm_Condition", "DECLINE", { expires: 1 });
    Cookies.remove("AcceptTerm_Condition", "DECLINE", { expires: 1 });
  };

  const initialFormValues = {
    firstName: "",
    lastName: "",
    country: "Select Country",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
  };

  const validationFormSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .min(3, "Please enter at least 3 characters.")
      .max(32, "You can enter only 32 characters.")
      .required("First name is required.")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed."),

    lastName: yup
      .string()
      .trim()
      .min(3, "Please enter atleast 3 characters.")
      .max(32, "You can enter only 32 characters.")
      .required("Last name is required.")
      .matches(/^[A-Za-z]+$/, " Only alphabets are allowed."),
    country: yup
      .string()
      .notOneOf(["Select Country"], "Please select country."),
    email: yup
      .string()
      .trim()
      .email("Please enter valid email.")
      .max(56, "Email should not exceed 56 characters.")
      .required("Email is required."),

    phoneNo: yup
      .string()
      .required("Phone number is required.")
      .max(13, "Enter a valid phone number.")
      .min(7, "Must be only 7 digits.")
      .test(
        "notAllRepeatedDigits",
        "Phone number cannot have all repeated digits.",
        (value) => {
          const numericValue = value?.replace(/[^0-9]/g, "");
          return !/(\d)\1{6,}/.test(numericValue);
        }
      ),
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

  const handleSignUp = async (values) => {
    if (!captchaVerified) {
      toast.error("Please solve the CAPTCHA.");
      return;
    }
    try {
      setIsLoading(true);
      const bodyData = {
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        email: values.email.toLowerCase(),
        mobileNumber: values.phoneNo,
        password: values.confirmPassword,
        countryCode: values.countryCode,
        termsAndConditions: isAccepted,
      };

      console.log("Sending signup request:", {
        url: api_configs.userSignup,
        data: bodyData
      });

      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.userSignup,
        bodyData: bodyData,
      });

      console.log("Signup response:", response);

      if (response?.data?.responseCode === 200) {
        toast.success(response.data.responseMessage);
        let endTime = moment().add(3, "m").unix();
        if (endTime) {
          const timeLefts = calculateTimeLeft(endTime * 1000);
          sessionStorage.setItem("otpTimer", JSON.stringify(timeLefts));
        }
        sessionStorage.setItem("previousRoute", router.asPath);
        router.replace(`/auth/verify-otp?${values.email.toLowerCase()}`);
      } else {
        toast.error(response?.data?.responseMessage || "An error occurred during signup");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.responseMessage || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupComponent>
      <Box className="loginBox signup-scollbar">
        <Box align="center" mb={5.4}>
          <Typography variant="h2" color="#fff" className="loginText">
            SIGN UP
          </Typography>

          <Typography variant="body1" color="#FFFFFFCC" fontWeight="500" mt={2}>
            Already have an account?{" "}
            <span
              style={{
                cursor: "pointer",
                color: "#8247FF",
              }}
              onClick={() => router.push("/auth/login")}
            >
              Log In
            </span>
          </Typography>
        </Box>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationFormSchema}
          onSubmit={(values) => handleSignUp(values)}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="First name"
                    type="text"
                    disabled={isLoading}
                    autoComplete="off"
                    name="firstName"
                    value={values.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                    InputProps={{
                      maxLength: 33,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiUser
                            style={{ color: "#585757", fontSize: "25px" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    {touched.firstName && errors.firstName}
                  </FormHelperText>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Last name"
                    type="text"
                    disabled={isLoading}
                    autoComplete="off"
                    name="lastName"
                    value={values.lastName}
                    onKeyPress={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                    error={Boolean(touched.lastName && errors.lastName)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      maxLength: 33,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiUser
                            style={{ color: "#585757", fontSize: "25px" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    {touched.lastName && errors.lastName}
                  </FormHelperText>
                </Grid>
              </Grid>

              <Box mt={3}>
                <FormControl fullWidth variant="standard">
                  <Select
                    name="country"
                    value={values.country}
                    error={Boolean(touched.country && errors.country)}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    onChange={handleChange}
                    renderValue={(selected) => {
                      if (selected === "Select Country") {
                        return (
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(255, 255, 255, 0.42)",
                              margin: "0px",
                              fontSize: "15px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <BiWorld
                              style={{ color: "#585757", fontSize: "25px" }}
                            />{" "}
                            &nbsp; &nbsp; Select Country
                          </Typography>
                        );
                      }

                      return (
                        <Typography
                          variant="body2"
                          style={{
                            color: "#fff",
                            margin: "0px",
                            fontSize: "15px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <BiWorld
                            style={{ color: "#585757", fontSize: "25px" }}
                          />{" "}
                          &nbsp; &nbsp; {selected}
                        </Typography>
                      );
                    }}
                    MenuProps={{
                      ...MenuProps,
                      PaperProps: {
                        ...MenuProps.PaperProps,
                        style: {
                          ...MenuProps.PaperProps.style,
                          backgroundColor: "#202020",
                        },
                      },
                    }}
                  >
                    <MenuItem value="Select Country" disabled>
                      Select Country
                    </MenuItem>
                    {countries &&
                      countries.map((country) => (
                        <MenuItem key={country.id} value={country.name}>
                          {country.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {touched.country && errors.country}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={3}>
                <TextField
                  variant="standard"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  disabled={isLoading}
                  fullWidth
                  autoComplete="off"
                  error={Boolean(touched.firstName && errors.firstName)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineMail
                          style={{ color: "#585757", fontSize: "25px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText error>
                  {touched.email && errors.email}
                </FormHelperText>
              </Box>

              <Box mt={2}>
                <PhoneInputBox fullWidth>
                  <PhoneInput
                    fullWidth
                    country={"gb"}
                    name="phoneNo"
                    value={values.phoneNo}
                    error={Boolean(touched.phoneNo && errors.phoneNo)}
                    onBlur={handleBlur}
                    onChange={(phone, e) => {
                      setFieldValue("countryCode", e.dialCode);
                      setFieldValue("phoneNo", phone);
                      console.log(e);
                    }}
                    inputProps={{
                      name: "phoneNo",
                    }}
                    disabled={isLoading}
                  />
                  <PhoneLogoBox>
                    <BsTelephone
                      style={{ color: "#585757", fontSize: "20px" }}
                    />
                  </PhoneLogoBox>
                </PhoneInputBox>
                <FormHelperText error>
                  {touched.phoneNo && errors.phoneNo}
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

              <Box mt={3}>
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

              <Box mt={3}>
                <DefalultRecaptcha
                  onCaptchaVerified={(isVerified) =>
                    setCaptchaVerified(isVerified)
                  }
                  isLoading={isLoading}
                />
              </Box>

              <Box className="agreeBox displayStart" mt={3} align="center">
                <Box style={{ marginLeft: "-8px" }} className="displayStart">
                  <Checkbox
                    checked={isChecked}
                    onClick={() => !isLoading && setIsChecked(!isChecked)}
                  />
                  <Typography variant="body2" color="primary" ml={1}>
                    <lable
                      style={{ color: "#FFFFFFCC" }}
                      onClick={() => !isLoading && setIsChecked(!isChecked)}
                    >
                      I accept the{" "}
                    </lable>
                    <Link
                      href="/static?termsConditions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    &{" "}
                    <Link
                      href="/static?privacyPolicy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <Box className="displayCenter" mt={5.4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={!captchaVerified || isLoading || !isChecked}
                >
                  Next {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      {acceptedPrivacyPolicy && (
        <PrivacyModal
          open={acceptedPrivacyPolicy}
          handleClose={() => setAcceptedPrivacyPolicy(false)}
          onAccept={handleAcceptPrivacyPolicy}
          onDecline={handleDeclinePrivacyPolicy}
        />
      )}
    </SignupComponent>
  );
}

Signup.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
