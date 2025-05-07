import React, { useState, useEffect, useMemo } from "react";
import { Typography, Box, Button } from "@mui/material";
import moment from "moment";
import { calculateTimeLeft } from "@/utils";
import { apiRouterCall } from "@/api-services/service";
import { toast } from "react-hot-toast";
import { api_configs } from "@/api-services";

export default function Timer({ email, setOTP }) {
  const [endTime, setEndTime] = useState(moment().add(3, "m").unix());
  const [timeStamp, setTimeStamp] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeStamp(calculateTimeLeft(endTime * 1000));
        const timeLefts = calculateTimeLeft(endTime * 1000);
        sessionStorage.setItem("otpTimer", JSON.stringify(timeLefts));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const handleResendOtpSubmit = async () => {
    try {
      setIsUpdating(true);
      const bodyData = {
        email: email,
      };
      setOTP("");
      const response = await apiRouterCall({
        method: "PATCH",
        url: api_configs.resendOTPU,
        bodyData: bodyData,
      });
      if (response?.data?.responseCode == 200) {
        sessionStorage.removeItem("otpTimer");
        setEndTime(moment().add(3, "m").unix());
        toast.success(response.data.responseMessage);
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
      isUpdating;
      toast.error(error?.response?.data?.responseMessage);
    }
  };

  const timeLeft = useMemo(() => {
    if (sessionStorage.getItem("otpTimer")) {
      const storedTimer = sessionStorage.getItem("otpTimer");
      const parsedTimer = JSON.parse(storedTimer);
      !timeStamp &&
        setEndTime(
          moment()
            .add(parsedTimer?.minutes, "m")
            .add(parsedTimer?.seconds, "s")
            .unix()
        );
      return parsedTimer;
    }
  }, [sessionStorage.getItem("otpTimer")]);

  return (
    <>
      {timeLeft && timeLeft.seconds >= 0 ? (
        <Typography
          variant="body1"
          fontWeight="500"
          color="primary"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          <Box>{timeLeft?.minutes.toString().padStart(2, "0")}</Box>m :{" "}
          <Box>{timeLeft?.seconds.toString().padStart(2, "0")}</Box>s
        </Typography>
      ) : (
        <Typography
          variant="body1"
          fontWeight="500"
          color="primary"
          style={{
            display: "flex",
            alignItems: "flex-start",
            cursor: "pointer",
          }}
          onClick={() => {
            if (!isUpdating) {
              handleResendOtpSubmit();
            }
          }}
        >
          {isUpdating ? "Sending..." : "Resend"}
        </Typography>
      )}
    </>
  );
}
