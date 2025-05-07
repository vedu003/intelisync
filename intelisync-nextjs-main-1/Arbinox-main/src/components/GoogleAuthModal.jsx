import {
  Box,
  Dialog,
  Button,
  DialogContent,
  IconButton,
  Typography,
  styled,
  FormHelperText,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OTPInput from "react-otp-input";
import Timer from "@/components/Timer/Timer";
import VerifiedModal from "./VerifiedModal";
import AppContext from "@/context/AppContext";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import * as yup from "yup";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { useRouter } from "next/router";

const MainComponent = styled(Box)(({ theme }) => ({
  "& input": {
    width: "52px",
    height: "54px",
  },
  "& .otptwofaBox": {
    "& input": {
      width: "52px",
      height: "54px",
      "@media (max-width: 768px)": {
        width: "32px",
        height: "32px",
      },
    },
  },
}));
export default function GoogleAuthModal({
  open,
  handleClose,
  isLoadingData,
  google2FaData,
  type,
}) {
  const router = useRouter();
  const auth = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticationSuccess, setAuthenticationSuccess] = useState(false);

  const initialFormValues = {
    otp: "",
  };

  const validationFormSchema = yup.object().shape({
    otp: yup
      .string()
      .required("OTP is required.")
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits."),
  });

  const handleVerifyGoogle = async (values) => {
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs[
          type
            ? "verifyGoogleAuthenctionCode"
            : "verifyGoogleAuthenctionCodeForEnableDisable"
        ],
        paramsData: {
          email: type || auth?.userData?.email,
          code: values.otp,
          type: !type
            ? !auth?.userData?.speakeasy
              ? "enable"
              : "disable"
            : undefined,
        },
      });
      if (response?.data?.responseCode === 200) {
        if (type) {
          toast.success(response.data.responseMessage);
          auth.userLogIn(true, response.data.result?.token);
          window.sessionStorage.setItem("token", response.data.result?.token);
          router.replace("/dashboard");
        } else {
          auth.getProfileDataHandler();
          if (!auth?.userData?.speakeasy) {
            setAuthenticationSuccess(true);
          } else {
            toast.success(response?.data?.responseMessage);
            handleClose();
          }
        }
      } else {
        toast.error(response?.data?.responseMessage);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <MainComponent>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent sx={{ padding: "12px" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "18px", right: "18px" }}
          >
            <CloseIcon style={{ color: "#fff" }} />
          </IconButton>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationFormSchema}
            onSubmit={handleVerifyGoogle}
          >
            {({ errors, handleBlur, handleChange, touched, values }) => (
              <Form autoComplete="off">
                <Box>
                  <Box className="upperBox">
                    <Typography variant="h5" color="#fff" align="center">
                      Verify Google Authentication
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#fff"
                      align="center"
                      style={{ maxWidth: "400px" }}
                    >
                      Enter a code form Google Authentication to make sure
                      everything works.
                    </Typography>
                  </Box>
                  <Box align="center" mt={2}>
                    {!auth?.userData?.speakeasy && (
                      <>
                        {google2FaData && google2FaData?.url && (
                          <img
                            src={google2FaData?.url || "/images/scanner.svg"}
                            alt="Scanner"
                            style={{ fill: "#000" }}
                          />
                        )}
                        {google2FaData && (
                          <Typography color="primary" variant="body1" mt={2}>
                            Secret Key : {google2FaData?.secret || "..."}
                          </Typography>
                        )}
                      </>
                    )}
                  </Box>

                  <Box className="displayCenter otptwofaBox" mt={3}>
                    <OTPInput
                      numInputs={6}
                      autoFocus={true}
                      value={values.otp}
                      onChange={(otp) =>
                        handleChange({
                          target: { name: "otp", value: otp },
                        })
                      }
                      disabled={isLoading}
                      renderInput={(props, index) => (
                        <input
                          {...props}
                          type="number"
                          style={{
                            marginRight: index === 5 ? "0px" : "12px",
                            textAlign: "center",

                            borderRadius: "8px",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            fontSize: "24px",
                            "@media (max-width: 768px)": {
                              width: "32px",
                              height: "32px",
                            },
                          }}
                        />
                      )}
                      secure
                    />
                  </Box>
                  <FormHelperText error>
                    {touched.otp && errors.otp}
                  </FormHelperText>
                </Box>
                <Box display="flex" justifyContent="center" marginTop="24px">
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                  >
                    Submit {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      {authenticationSuccess && (
        <VerifiedModal
          open={authenticationSuccess}
          handleClose={() => {
            handleClose();
            setAuthenticationSuccess(false);
          }}
        />
      )}
    </MainComponent>
  );
}
