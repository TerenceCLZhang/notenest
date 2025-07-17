import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Notes from "./pages/Notes/Notes";
import CreateNote from "./pages/Notes/CreateNote";
import EditNote from "./pages/Notes/EditNote";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearAccessToken, setAccessToken } from "./state/accessTokenSlice";
import { clearUsername, setUsername } from "./state/userSlice";
import type { RootState } from "./state/store";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.accessToken.token);
  const [loading, setLoading] = useState(true); // To block UI until refresh finishes

  useEffect(() => {
    const refresh = async () => {
      if (token) {
        setLoading(false); // Token already exists, no need to refresh
        return;
      }

      // Get new access token and user information when the user refreshes page
      try {
        const res = await axios.post(
          "http://localhost:8080/auth/token",
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
  }, []);

  if (loading) return <div>Loading...</div>; // prevent premature render

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/create" element={<CreateNote />} />
        <Route path="/notes/edit/:id" element={<EditNote />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
