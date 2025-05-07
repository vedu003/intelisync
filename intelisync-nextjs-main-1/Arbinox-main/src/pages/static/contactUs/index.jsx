// import Goback from "@/components/Goback";
import HomeLayout from "@/layout/HomeLayout";
import {
  Divider,
  Box,
  Typography,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";
import { Container, styled } from "@mui/system";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import PageLoader from "@/components/PageLoader";
import { postAPIHandler } from "@/api-services/service";
import { useRouter } from "next/router";

const StyledFaqSection = styled("div")(({ theme }) => ({
  "& .faqMainBox": {
    padding: "120px 0px 68px 120px",
    minHeight: "calc(100vh - 383px)",

    [theme.breakpoints.down("md")]: {
      padding: "120px 0px 68px 0px",
    },
    "& .multiline": {
      "& .MuiInputBase-root": {
        height: "auto !important",
      },
    },
  },
}));

export default function ContactUs() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .max(100, "Should not exceeds 100 characters.")
      .email("Please enter a valid email address.")
      .required("Email is required."),
    fullName: yup
      .string()
      .required("Full name is required.")
      .max(30, "Should not exceeds 30 characters.")
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/g,
        "Please enter a valid name."
      ),
    message: yup
      .string()
      .required("Message is required.")
      .min(3, "Please enter atleast 3 characters.")
      .max(600, "You can enter only 600 characters."),
  });

  const handleSubmitContact = async (values) => {
    try {
      setIsLoading(true);
      const response = await postAPIHandler({
        endPoint: "contactUs",
        dataToSend: {
          name: values.fullName,
          email: values.email.toLowerCase(),
          message: values.message,
        },
      });
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        router.push("/");
      } else {
        toast.error(
          response?.data?.message ? response?.data?.message : response?.message
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <StyledFaqSection>
      <Box className="faqMainBox">
        <Box className="staticManage">
          <Box>
            {/* <Goback title="Contact Us" /> */}
            <Divider
              style={{ border: "1px solid #00000026", margin: "16px 0px" }}
            />
          </Box>
          <Container maxWidth="sm">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmitContact(values)}
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
                  <Box className="mainTextBox">
                    <label>Full Name</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Full Name"
                      type="name"
                      name="fullName"
                      disabled={isLoading}
                      value={values.fullName}
                      error={Boolean(touched.fullName && errors.fullName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.fullName && errors.fullName}
                    </FormHelperText>
                  </Box>
                  <Box className="mainTextBox">
                    <label>Email</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter email"
                      type="email"
                      name="email"
                      disabled={isLoading}
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{ style: { textTransform: "lowercase" } }}
                    />
                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Box>
                  <Box className="mainTextBox multiline">
                    <label>Message</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type Something....."
                      multiline
                      rows="6"
                      type="text"
                      name="message"
                      disabled={isLoading}
                      value={values.message}
                      error={Boolean(touched.message && errors.message)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Box className="displaySpaceBetween">
                      <FormHelperText error>
                        {touched.message && errors.message}
                      </FormHelperText>
                      <Typography variant="body2">
                        {values.message.length}/600
                      </Typography>
                    </Box>
                  </Box>
                  <Box align="center" mt={1} mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      SUBMIT
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Box>
      </Box>
      {isLoading && <PageLoader />}
    </StyledFaqSection>
  );
}
ContactUs.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
