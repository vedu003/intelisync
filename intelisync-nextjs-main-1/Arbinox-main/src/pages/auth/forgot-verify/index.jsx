import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import OTPInput from "react-otp-input";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { btnArr } from "@/data";
import Timer from "@/components/Timer/Timer";
import { api_configs, reCaptacha } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import AppContext from "@/context/AppContext";
import CustomHead from "@/components/CustomHead";
import TermComp from "@/components/TermComp";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";

const OtpComponent = styled(Box)(({ theme }) => ({
  height: "100%",
  zIndex: "999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .upperBox": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "16px",
  },
  "& .displayotp": {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  "& input": {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    fontSize: "20px",
    height: "55px !important",
    width: "64px !important",
    marginRight: "16px",
    color: "#fff !important",
    background: "#FFFFFF0D",

    [theme.breakpoints.down("sm")]: {
      height: "50px !important",
      width: "50px !important",
    },
    // "@media(max-width: 600px)": {
    //   height: "50px !important",
    //   width: "53px !important",
    //   marginRight: "10px",
    // },
    // "@media(max-width: 425px)": {
    //   height: "48px !important",
    //   width: "46px !important",
    //   marginRight: "10px",
    //   maxWidth: "300px",
    //   fontSize: "14px !important",
    // },
    // "@media(max-width: 375px)": {
    //   height: "41px !important",
    //   width: "37px !important",
    //   marginRight: "7px",
    // },
  },
  "& .otpInput:last-child": {
    marginRight: "0px !important", // remove marginRight for last input
  },
  "& .timeBox": {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "24px",
  },
}));

export default function ForgotOtpVerify() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const [OTP, setOTP] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  let email = window.location.search.split("?")[1];

  const verifyOTPHandler = async () => {
    setIsVerifying(true);
    try {
      const res = await apiRouterCall({
        method: "PATCH",
        url: api_configs.verifyOTP,
        bodyData: {
          email: email,
          otp: OTP,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        window.localStorage.removeItem("otpTimer");
        router.replace("/auth/reset-password?query=" + res.data.result.token);
      } else {
        toast.error(res.data.responseMessage);
        setOTP("");
      }
      setIsVerifying(false);
    } catch (error) {
      console.log(error);
      setIsVerifying(false);
      setOTP("");
    }
  };

  return (
    <OtpComponent>
      <Box>
        <Box className="upperBox" mb={5.4}>
          <Typography variant="h2" color="#fff" className="loginText">
            OTP Verification
          </Typography>
          <Typography
            variant="body1"
            color="#FFFFFF99"
            style={{ maxWidth: window.innerWidth < 425 ? "300px" : "400px" }}
          >
            A 6- digit OTP has been sent to your registered email address{" "}
            <span>{email}.</span>
          </Typography>
        </Box>

        <Box className="displayCenter displayotp" mt={4}>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            numInputs={4}
            autoFocus={true}
            disabled={isVerifying}
            renderInput={(props, index) => (
              <input
                {...props}
                className={`otpInput ${index === 5 ? "lastInput" : ""}`}
              />
            )}
            secure
          />
        </Box>
        <Box className="timeBox">
          <Timer email={email} setOTP={setOTP} />
        </Box>
        <Box mt={5.5} align="center">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => verifyOTPHandler()}
            disabled={!OTP || OTP.length !== 4 || isVerifying}
          >
            Submit {isVerifying && <ButtonCircularProgress />}
          </Button>
        </Box>

        {/* <Box mt={1}>
          <TermComp isShow={true} />
        </Box> */}
      </Box>
    </OtpComponent>
  );
}

ForgotOtpVerify.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
