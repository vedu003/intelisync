import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PasswordSuccess from "./PasswordSuccess";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";
import ButtonCircularProgress from "./ButtonCircularProgress";
import AppContext from "@/context/AppContext";

export default function ChangePassModal({
  open,
  handleClose,
  authenticationSuccess,
  setAuthenticationSuccess,
}) {
  const auth = useContext(AppContext);
  // const [authenticationSuccess, setAuthenticationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formInitialSchema = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const formValidationSchema = yep.object().shape({
    oldPassword: yep
      .string()
      .trim()
      .required("Please enter old password.")
      .min(6, "Please enter at least 6 characters.")
      .max(18, "You can enter up to 18 characters."),
    password: yep
      .string()
      .trim()
      .notOneOf(
        [yep.ref("oldPassword"), null],
        "Password cannot be the same as old password."
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])[a-zA-Z\d!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]{8,}$/,
        "Password must contain 8 characters, one uppercase, one lowercase, one number, and one special character."
      )
      .required("Please enter password.")
      .min(6, "Please enter at least 6 characters.")
      .max(18, "You can enter up to 18 characters."),
    confirmPassword: yep
      .string()
      .required("Confirm password and new password should match.")
      .oneOf([yep.ref("password"), null], "Confirm password does not match."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const bodyData = {
        oldPassword: values.oldPassword,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const response = await apiRouterCall({
        method: "PUT",
        url: api_configs.changePasswordUser,
        bodyData: bodyData,
      });
      if (response.data.responseCode === 200) {
        setAuthenticationSuccess(true);
        handleClose();
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent sx={{ padding: "12px" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: "18px", right: "18px" }}
          >
            <CloseIcon style={{ color: "#fff" }} />
          </IconButton>

          <Box align="center" mt={1.5}>
            <Typography variant="h6" color="#fff">
              Change Password
            </Typography>
          </Box>
          <Formik
            initialValues={formInitialSchema}
            validationSchema={formValidationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <Form>
                <Box
                  mt={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                  }}
                >
                  <Typography variant="body1" color="#fff" mb={1}>
                    Current Password
                  </Typography>
                  <TextField
                    placeholder="Enter old password"
                    fullWidth
                    variant="standard"
                    style={{ borderRadius: "12px", color: "#fff" }}
                    type={"password"}
                    name="oldPassword"
                    value={values.oldPassword}
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <FormHelperText error>
                    {touched.oldPassword && errors.oldPassword}
                  </FormHelperText>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                  }}
                >
                  <Typography variant="body1" color="#fff" mb={1}>
                    New Password
                  </Typography>
                  <TextField
                    placeholder="Enter new password"
                    fullWidth
                    variant="standard"
                    style={{ borderRadius: "12px", color: "#fff" }}
                    type={"password"}
                    name="password"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <FormHelperText error>
                    {touched.password && errors.password}
                  </FormHelperText>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="body1" color="#fff" mb={1}>
                    Confirm Password
                  </Typography>
                  <TextField
                    placeholder="Enter confirm password"
                    fullWidth
                    variant="standard"
                    style={{ borderRadius: "12px", color: "#fff" }}
                    type={"password"}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isLoading}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <FormHelperText error>
                    {touched.confirmPassword && errors.confirmPassword}
                  </FormHelperText>
                </Box>
                <Box display="flex" justifyContent="center" marginTop="24px">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
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
        {/* {authenticationSuccess && (
          <PasswordSuccess
            open={authenticationSuccess}
            handleClose={() => {
              handleClose();
              auth.handleLogout();
              setAuthenticationSuccess(false);
            }}
          />
        )} */}
      </Dialog>
    </>
  );
}
