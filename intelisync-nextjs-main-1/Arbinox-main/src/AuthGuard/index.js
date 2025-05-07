export const isAuthenticated = () => {
  const token = localStorage.getItem("user_token") === null;
  return !!token;
};
export const withoutAuthRoutes = [
  "/price",
  "/static",
  "/contact-us",
  "/static/faq",
  "/charts/[coins]",
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/forgot-verify",
  "/auth/verify-otp",
  "/auth/reset-password",
  "/disclaimer",
  "/privacy-policy",
  "/terms-conditions",
  "/terms-and-conditions",
  "/about-us",
];
