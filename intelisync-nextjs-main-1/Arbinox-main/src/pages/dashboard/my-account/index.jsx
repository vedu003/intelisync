import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import ChangePassModal from "@/components/ChangePassModal";
import GoogleAuthModal from "@/components/GoogleAuthModal";
import AppContext from "@/context/AppContext";
import DashboardLayout from "@/layout/DashboardLayout";
import { getBase64 } from "@/utils";
import { PiHeadphones } from "react-icons/pi";

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
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MenuProps, PhoneInputBox, PhoneLogoBox } from "@/pages/auth/sign-up";
import { BsTelephone } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import Image from "next/image";
import PasswordSuccess from "@/components/PasswordSuccess";

const MainComponent = styled("div")({
  "& .MuiOutlinedInput-input": {
    padding: "10px !important",
  },
  "& .phoneNumberBox": {
    "& .form-control": {
      background: "#FFFFFF0D !important",
      border: "1px solid #FFFFFF0D !important",
    },
  },
  "& .backImg": {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "120px",
    borderRadius: "30px",
    backgroundPosition: "center",
  },
  "& .profileBox": {
    position: "absolute",
    top: "180px",
    left: "40px",
    "@media(max-width: 600px)": {
      display: "none",
    },
  },
  "& .editBtnBox": {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: "210px",
    right: "25px",
    background: "rgba(255, 255, 255, 1)",
    padding: "10px 12px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  "& .btnBox": {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    justifyContent: "flex-end",
  },
  // "& .sideButton": {
  //   background: "#FFFFFF1A",
  //   color: "#FFFFFFCC",
  //   boxShadow: "none",
  //   "& :hover": {
  //     background: "#FFFFFF1A",
  //     color: "#fff",
  //     boxShadow: "none",
  //   },

  //   [theme.breakpoints.down("md")]: {
  //     marginTop: "0px",
  //   },
  // },
});

export default function acount() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const [authenticationSuccess, setAuthenticationSuccess] = useState(false);
  const [passModalOpen, setPassModalOpen] = useState(false);
  const [twoFaOpen, SetTwoFaOpen] = useState(false);
  const [isBannerLoading, setIsBannerLoading] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [google2FaData, setGoogle2FaData] = useState();

  const initialFormValues = {
    firstName: auth.userData.firstName || "",
    lastName: auth.userData.lastName || "",
    country: auth.userData.country || "Select Country",
    email: auth.userData.email || "",
    phoneNo: auth.userData.mobileNumber || "",
    countryCode: auth.userData.countryCode || "",
  };

  const validationFormSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .min(3, "Please enter atleast 3 characters.")
      .max(32, "You can enter only 32 characters.")
      .required("First name is required.")
      .matches(
        /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9])?[a-zA-Z0-9]*)*$/g,
        "Please enter first name."
      ),

    lastName: yup
      .string()
      .trim()
      .min(3, "Please enter atleast 3 characters.")
      .max(32, "You can enter only 32 characters.")
      .required("Last name is required.")
      .matches(
        /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9])?[a-zA-Z0-9]*)*$/g,
        "Please enter last name."
      ),
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
  });

  const handleChangeImage = async (image) => {
    try {
      setIsBannerLoading(true);
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.loginedit,
        bodyData: {
          bannerImage: image,
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        auth.getProfileDataHandler();
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsBannerLoading(false);
    } catch (error) {
      setIsBannerLoading(false);
      console.error(error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const bodyData = {
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        email: values.email.toLowerCase(),
        mobileNumber: values.phoneNo,
        countryCode: values.countryCode,
      };
      const response = await apiRouterCall({
        method: "PUT",
        url: api_configs.editUserProfile,
        bodyData: bodyData,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        auth.getProfileDataHandler();
        router.push(`/dashboard`);
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleGetGooleData = async (source) => {
    try {
      setIsGoogleLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.enableDisableGoogleAuthenction,
        source: source,
      });
      if (response?.data?.responseCode === 200) {
        setGoogle2FaData(response.data.result);
      } else {
        setGoogle2FaData();
      }
      setIsGoogleLoading(false);
    } catch (error) {
      setIsGoogleLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get("/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
    });
  }, []);

  useEffect(() => {
    setBannerImage(auth.userData?.profilePic || "");
  }, [auth.userData?.profilePic]);

  useEffect(() => {
    auth?.setTopHeading(
      <Box display="flex" alignItems="center">
        {/* <Image
          height={24}
          width={24}
          quality={100}
          src="/images/home-line.svg"
          style={{ marginRight: "6px" }}
        /> */}
        <PiHeadphones style={{ color: "#fff" }} /> &nbsp;
        <Typography variant="h3" color="primary" style={{ whiteSpace: "pre" }}>
          Help Center
        </Typography>
      </Box>
    );
  }, []);
  return (
    <MainComponent>
      <Box className="upperBox" sx={{ position: "relative" }}>
        <Typography variant="h5" color="#fff" alignItems="center" mb={3}>
          My Account
        </Typography>

        <Box
          className="backImg"
          style={{
            backgroundImage: `url(${bannerImage || "/images/backMagic.svg"})`,
          }}
        />

        <Box className="btnBox">
          <Button
            variant="contained"
            color="primary"
            style={{ whiteSpace: "pre" }}
            onClick={() => {
              if (!auth?.userData?.speakeasy) {
                handleGetGooleData(axios.CancelToken.source());
              }
              SetTwoFaOpen(true);
            }}
          >
            {auth?.userData?.speakeasy ? "Disable" : "Enable"} 2FA
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ whiteSpace: "pre" }}
            onClick={() => setPassModalOpen(true)}
          >
            Change Password
          </Button>
        </Box>
      </Box>
      <Box className="loweBox" mt={2.5}>
        <Paper elevation={2}>
          <Box className="fieldParent">
            <Formik
              enableReinitialize
              initialValues={initialFormValues}
              validationSchema={validationFormSchema}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form>
                  {[
                    {
                      label: "First Name",
                      placeholder: "Enter firstname",
                      name: "firstName",
                    },
                    {
                      label: "Last Name",
                      placeholder: "Enter lastname",
                      name: "lastName",
                    },
                    {
                      label: "Email",
                      placeholder: "Enter email",
                      name: "email",
                    },
                    {
                      label: "Country",
                      placeholder: "Enter country",
                      name: "country",
                    },
                    {
                      label: "Mobile",
                      placeholder: "Enter phone number",
                      name: "phoneNo",
                    },
                  ].map((field, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "14px",
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: "100px",
                          "@media (max-width:767px)": {
                            minWidth: "55px",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="rgba(255, 255, 255, 0.6)"
                        >
                          {field.label}
                        </Typography>
                      </Box>
                      {!["Country", "Mobile"].includes(field.label) && (
                        <Box width="100%">
                          <TextField
                            placeholder={field.placeholder}
                            fullWidth
                            variant="standard"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values[field.name]}
                            name={field.name}
                            style={{
                              color: "rgba(255, 255, 255, 1) !important",
                              fontWeight: "400",
                              fontSize: "16px",
                            }}
                            error={
                              touched[field.name] && Boolean(errors[field.name])
                            }
                            disabled={isLoading || field.label === "Email"}
                          />
                          <FormHelperText error>
                            {touched[field.name] && errors[field.name]}
                          </FormHelperText>
                        </Box>
                      )}
                      {field.label === "Country" && (
                        <Box width="100%">
                          <FormControl fullWidth>
                            <Select
                              name="country"
                              value={values.country}
                              error={Boolean(touched.country && errors.country)}
                              onBlur={handleBlur}
                              disabled={isLoading}
                              onChange={handleChange}
                              renderValue={(selected) => {
                                if (selected?.length === 0) {
                                  return (
                                    <Typography
                                      variant="body2"
                                      color="secondary"
                                      style={{
                                        margin: "0px",
                                        fontSize: "15px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <BiWorld
                                        height={20}
                                        width={20}
                                        style={{
                                          color: "#585757",
                                          fontSize: "25px",
                                        }}
                                      />{" "}
                                      &nbsp; &nbsp; Country
                                    </Typography>
                                  );
                                }

                                return (
                                  <Typography
                                    variant="body2"
                                    color="secondary"
                                    style={{
                                      margin: "0px",
                                      fontSize: "15px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <BiWorld
                                      height={20}
                                      width={20}
                                      style={{
                                        color: "#585757",
                                        fontSize: "25px",
                                      }}
                                    />{" "}
                                    &nbsp; &nbsp; {selected}
                                  </Typography>
                                );
                              }}
                              MenuProps={MenuProps}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value="" disabled>
                                Select country
                              </MenuItem>
                              {countries &&
                                countries.map((map) => {
                                  return (
                                    <MenuItem key={map.name} value={map.name}>
                                      {map.name}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                          <FormHelperText error>
                            {touched.country && errors.country}
                          </FormHelperText>
                        </Box>
                      )}
                      {field.label === "Mobile" && (
                        <Box width="100%" className="phoneNumberBox">
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
                      )}
                    </Box>
                  ))}
                  <Box align="center" mt={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                    >
                      Submit {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Box>
      {twoFaOpen && (
        <GoogleAuthModal
          open={twoFaOpen}
          handleClose={() => SetTwoFaOpen(false)}
          google2FaData={google2FaData}
          isLoadingData={isGoogleLoading}
        />
      )}
      {passModalOpen && (
        <ChangePassModal
          open={passModalOpen}
          handleClose={() => setPassModalOpen(false)}
          authenticationSuccess={authenticationSuccess}
          setAuthenticationSuccess={(e) => setAuthenticationSuccess(e)}
        />
      )}

      {authenticationSuccess && (
        <PasswordSuccess
          open={authenticationSuccess}
          handleClose={() => {
            // handleClose();
            auth.handleLogout();
            setAuthenticationSuccess(false);
          }}
        />
      )}
    </MainComponent>
  );
}

acount.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
