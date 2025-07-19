import axios from "axios";
import { store } from "../state/store";
import { clearAccessToken, setAccessToken } from "../state/accessTokenSlice";
import { clearUsername } from "../state/userSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().accessToken.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle token expiry and retry request
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      !originalRequest.__retry // prevent infinite retry loops
    ) {
      originalRequest.__retry = true;

      try {
        // Refresh token
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        // Save new token to store
        store.dispatch(setAccessToken(newAccessToken));

        // Retry the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — clear session and notify
        store.dispatch(clearAccessToken());
        store.dispatch(clearUsername());
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    // If not a 403 or already retried — reject the error
    return Promise.reject(error);
  }
);

export default api;
