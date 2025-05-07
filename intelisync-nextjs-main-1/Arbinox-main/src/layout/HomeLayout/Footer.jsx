import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";
import { FaTelegramPlane } from "react-icons/fa";
import Logo from "../../components/Logo";

const MainComponent = styled("Box")(({ theme }) => ({
  "& .mainfooterBox": {
    background:
      "linear-gradient(180deg, #07080A 48%, rgba(7, 8, 10, 0.8) 100%)",
    boxShadow: "0px -4px 10px 0px #0000001C",
    backdropFilter: "blur(20px)",
    borderTop: "1px solid #1B1C1E",
    borderRadius: "80px 60px 0 0",
    "@media(max-width:767px)": {
      borderRadius: "40px 40px 0 0",
    },
  },
  "& .AboutUsBox": {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    "& .MuiTypography-root": {
      " :hover": {
        color: "#7A5AF8",
      },
    },
  },
  "& h6": {
    textDecoration: "none",
    // margin: "0 10px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#ffffff",
    cursor: "pointer",
    lineHeight: "17.64px",
    "@media(max-width:599px)": {
      textAlign: "center",
      fontSize: "13px !important",
    },
  },

  "& .socialBox": {
    display: "flex",
    justifyContent: "flex-start",
    gap: "6px",
    "@media(max-width:767px)": {
      margin: "auto",
      justifyContent: "center",
      marginTop: "10px",
      // display: "none",
    },
  },
  "& .iconBox": {
    color: "#fff",
    cursor: "pointer",
    fontSize: "25px",
  },

  "& .baseSection": {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    padding: "20px 0px",
    "& a": {
      textDecoration: "none",
      margin: "0 10px",
      fontSize: "14px",
      fontWeight: "400",
      color: theme.palette.text.secondary,
      "@media(max-width:420px)": {
        fontSize: "12px",
        margin: "0 5px",
      },
    },
    "@media(max-width:575px)": {
      display: "block",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  "& .gridleftBox": {
    maxWidth: "400px",
    "@media(max-width:767px)": {
      textAlign: "center",
      maxWidth: "100%",
    },
  },
  "& .mainfootercustom": {
    alignItems: "flex-start",
    "@media(max-width:767px)": {
      flexWrap: "wrap",
      WebkitBoxPack: "center",
      justifyContent: "center",
    },
  },

  "& .logoText": {
    maxWidth: "500px",
    fontSize: "15px !important",
    "@media(max-width:599px)": {
      maxWidth: "100%",
      marginBottom: "10px",
      fontSize: "13px !important",
    },
  },

  "& .footerBottomNew": {
    "@media(max-width:599px)": {
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "10px",
      marginBottom: "10px",
    },
    "& .displayStart": {
      "& .MuiTypography-root": {
        " :hover": {
          color: "#B632D8",
        },
      },
    },
  },
  "& .centerBox": {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    [theme.breakpoints.down("sm")]: {
      gap: "7px",
    },
    "& h5": {
      textDecoration: "none",
      lineHeight: "20px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#FFFFFF80",
      cursor: "pointer",
      "@media(max-width:599px)": {
        textAlign: "center",
        fontSize: "13px !important",
      },
      "@media(max-width:420px)": {},
    },
  },

  "& .disclaimer": {
    fontSize: "12px",
    fontWeight: "400",
    "@media(max-width:767px)": {
      textAlign: "center",
    },
  },
  "& .MuiDivider-root": {
    borderColor: "#FFFFFF12",
  },
  "& .innerfooterBox": {
    padding: "50px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "37px 10px 10px",
    },
  },
  "& .companyBox": {
    alignItems: "flex-start",
    gap: "70px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "25px",
    },
  },
  "& .dot": {
    background: "#7A5AF8",
    width: "44px",
    height: "44px",
    padding: "8px",
    "&:hover": {
      background: "#7A5AF8",
    },
  },
}));

const Footer = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialFormValues = {
    email: "",
  };

  const validationFormSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Please enter valid email.")
      .max(56, "Email should not exceed 56 characters.")
      .required("Email is required."),
  });

  const handleSubscribe = async (values, resetForm) => {
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.subscribe,
        bodyData: { email: values.email.toLowerCase() },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        resetForm();
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const femmecubatorLogo = (
    <Box onClick={() => router.push("/")} align="left">
      <img
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        src="/images/logo.svg"
        alt="Logo"
        style={{
          cursor: "pointer",
          filter: "brightness(0) invert(1)",
          marginBottom: "10px",
        }}
      />
    </Box>
  );

  return (
    <MainComponent
      style={{ background: "linear-gradient(90deg, #B331FF, #8F00EE)" }}
    >
      <Box
        className="mainfooterBox main-sectionGap"
        style={{ background: "linear-gradient(90deg, #B331FF, #8F00EE)" }}
      >
        <Container>
          <Box className="innerfooterBox" mb={3}>
            <Box className="displaySpacebetween mainfootercustom">
              <Box className="gridleftBox">
                {femmecubatorLogo}

                <Typography
                  variant="body2"
                  color="primary"
                  mb={5}
                  className="logoText"
                >
                  Track the real-time market capitalization of top
                  cryptocurrencies with Arbinox. Stay up to date with live data
                  on Bitcoin, Ethereum, and more—keeping you informed about the
                  latest market movements and trends.
                </Typography>
                <Formik
                  initialValues={initialFormValues}
                  validationSchema={validationFormSchema}
                  onSubmit={(values, { resetForm }) =>
                    handleSubscribe(values, resetForm)
                  }
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
                      <TextField
                        variant="standard"
                        fullWidth
                        placeholder="Enter email"
                        type="email"
                        name="email"
                        value={values.email}
                        disabled={isLoading}
                        autoComplete="off"
                        error={Boolean(touched.firstName && errors.firstName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                  padding: "9px 23px",
                                  marginRight: "-5px",
                                  background: "linear-gradient(90deg, #B331FF, #8F00EE)",
                                  borderRadius: "0px 10px 10px 8F00EE",
                                  border: "1px solid white",

                                }}
                              >
                                {isLoading ? "Loading..." : "Subscribe"}
                              </Button>
                            </InputAdornment>
                          ),
                          inputProps: {
                            style: {
                              padding: "7px 0px",
                              background: "transparent",
                            },
                          },
                        }}
                      />
                      <FormHelperText error>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Form>
                  )}
                </Formik>
              </Box>

              <Box className="companyBox displayStart">
                <Box className="centerBox">
                  <Typography variant="h5">Company</Typography>
                  <Box className="AboutUsBox">
                    <Typography
                      variant="h6"
                      onClick={() => router.push("/about-us")}
                    >
                      About Us
                    </Typography>
                    <Typography
                      variant="h6"
                      onClick={() => router.push("/static/faq")}
                    >
                      FAQs
                    </Typography>

                    <Typography
                      variant="h6"
                      onClick={() => router.push("/contact-us")}
                    >
                      Contact Us
                    </Typography>
                  </Box>
                </Box>

                <Box className="centerBox">
                  <Typography variant="h5"> Legal</Typography>
                  <Box className="AboutUsBox">
                    <Typography
                      variant="h6"
                      onClick={() => router.push("/terms-and-conditions")}
                    >
                      Terms of Services
                    </Typography>
                    <Typography
                      variant="h6"
                      onClick={() => router.push("/privacy-policy")}
                    >
                      Privacy Policy
                    </Typography>

                    <Typography
                      variant="h6"
                      onClick={() => router.push("/disclaimer")}
                    >
                      Disclaimer
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        <Divider />
        <Container>
          <Box
            className="displaySpacebetween"
            pt={3.8}
            pb={3.8}
            sx={{
              "@media(max-width:767px)": {
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
              },
            }}
          >
            <Typography variant="body2" color="primary" className="disclaimer">
              Copyright© 2025 Arbinox. All Rights Reserved.
            </Typography>

            <Box className="displayStart" style={{ gap: "30px" }}>
              {/* <IconButton target="_blank" className="socialButton">
                <img
                  src="/images/Social/facebook.svg"
                  alt="Image"
                  className="socialButton"
                />
              </IconButton> */}
              <IconButton
                target="_blank"
                href="https://x.com/MECAP_DSC"
                className="socialButton"
              >
                <img src="/images/Social/twitter.svg" alt="Image" />
              </IconButton>
              <IconButton
                target="_blank"
                href="https://www.instagram.com/mecapdsc/?utm_source=ig_web_button_share_sheet"
                className="socialButton"
              >
                <img src="/images/Social/insta.svg" alt="Image" />
              </IconButton>

              <IconButton
                target="_blank"
                href="https://t.me/+8_3Ixon23pswZmQ8"
                className="socialButton"
              >
                <FaTelegramPlane style={{ color: "#fff", fontSize: "27px" }} />
                {/* <img src="/images/Social/insta.svg" alt="Image" /> */}
              </IconButton>
              {/* <IconButton target="_blank" className="socialButton">
                <img src="/images/Social/linkdin.svg" alt="Image" />
              </IconButton> */}
            </Box>
          </Box>
        </Container>
        <Box className="neonBox"></Box>
      </Box>
    </MainComponent>
  );
};

export default Footer;
