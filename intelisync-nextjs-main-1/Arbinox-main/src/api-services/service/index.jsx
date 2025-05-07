import axios from "axios";
import { api_configs } from "../index";
import toast from "react-hot-toast";

// Default configuration for axios
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2176';

export const apiRouterCall = async ({
  method,
  url,
  bodyData,
  paramsData,
  token,
  source,
}) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: {
        token: token ? token : window.localStorage.getItem("user_token"),
      },
      data: bodyData ? bodyData : null,
      params: paramsData ? paramsData : null,
      cancelToken: source ? source.token : null,
    });
    return response;
  } catch (error) {
    console.error("API Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      toast.error(error.response.data.responseMessage || "An error occurred");
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("Network error. Please check your connection.");
      return { data: { responseMessage: "Network error" } };
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error(error.message || "An error occurred");
      return { data: { responseMessage: error.message } };
    }
  }
};

export const dataPostHandler = async (endPoint, dataToSend) => {
  try {
    const res = await axios({
      method: "POST",
      url: api_configs[endPoint],
      headers: {
        token: window.localStorage.getItem("user_token"),
      },
      data: dataToSend,
    });
    // console.log(" ------- response responseCode ", res);
    if (res.data.responseCode === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.responseMessage);
    console.log(" error ", error);
    if (error.response) {
      if (error.response.status === 440) {
        window.location.href = "/";
      }
      if (error.response.status === 403) {
        // window.localStorage.removeItem("token");
        // window.location.href = "/";
        window.localStorage.removeItem("user_token");
      }
      return error?.response;
    }
  }
};

export const postAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    return await axios({
      method: "POST",
      url: api_configs[endPoint],
      headers: {
        token: window.localStorage.getItem("user_token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const putAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    return await axios({
      method: "PUT",
      url: api_configs[endPoint],
      headers: {
        token: window.localStorage.getItem("user_token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const deleteAPIHandler = async ({
  endPoint,
  dataToSend,
  paramsData,
}) => {
  try {
    return await axios({
      method: "DELETE",
      url: api_configs[endPoint],
      headers: {
        token: window.localStorage.getItem("user_token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getAPIHandler = async ({ endPoint, id, source, paramsData }) => {
  try {
    console.log(" ----- paramsData ", paramsData);
    return await axios({
      method: "GET",
      url: id ? `${api_configs[endPoint]}/${id}` : api_configs[endPoint],
      params: paramsData ? paramsData : null,
      headers: {
        token: window.localStorage.getItem("user_token"),
      },
      cancelToken: source ? source.token : null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const patchAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    return await axios({
      method: "PATCH",
      url: api_configs[endPoint],
      headers: {
        token: window.localStorage.getItem("user_token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getDataHandlerAPI = async (endPoint, dataSend) => {
  try {
    const res = await axios({
      method: "GET",
      url: api_configs[endPoint],
      headers: {
        token: window.localStorage.getItem("user_token"),
      },
      params: dataSend,
    });
    if (res.data.responseCode === 200) {
      return res.data.result;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 440) {
      window.location.href = "/";
    }
    if (error.response.status === 403) {
      // window.localStorage.removeItem("token");
      // window.location.href = "/";
    }
    return false;
  }
};
