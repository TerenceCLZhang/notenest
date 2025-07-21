import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import axios from "axios";
import { clearAccessToken, setAccessToken } from "../state/accessTokenSlice";
import { clearUsername, setUsername } from "../state/userSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAccessToken = () => {
  const token = useSelector((state: RootState) => state.accessToken.token);
  const [loading, setLoading] = useState(true); // To block UI until refresh finishes
  const dispatch = useDispatch();

  // Get access token
  useEffect(() => {
    const refresh = async () => {
      if (token) {
        setLoading(false); // Token already exists, no need to refresh
        return;
      }

      // Get new access token and user information when the user refreshes page
      try {
        const res = await axios.post(
          `${API_BASE_URL}/auth/token`,
          {},
          { withCredentials: true }
        );
        dispatch(setAccessToken(res.data.accessToken));
        dispatch(setUsername(res.data.user.username));
      } catch (error) {
        dispatch(clearAccessToken());
        dispatch(clearUsername());
      } finally {
        setLoading(false); // Always end loading
      }
    };

    refresh();
  }, [dispatch, token]);

  return { loading };
};

export default useAccessToken;
